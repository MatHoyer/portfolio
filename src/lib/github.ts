import type { DeveloperData, GitHubUserResponse, Language, Repository } from "./types";

const GITHUB_USER = "mathoyer";
const EXCLUDED_REPO = "MatHoyer";

const EXCLUDED_LANGUAGES = [
  "html",
  "css",
  "shell",
  "makefile",
  "perl",
  "roff",
];

const EXCLUDED_LANGUAGES_GLOBAL = [
  ...EXCLUDED_LANGUAGES,
  "dockerfile",
];

const LANGUAGE_SHORTCUTS: Record<string, string> = {
  TypeScript: "TS",
  JavaScript: "JS",
};

const GITHUB_QUERY = `
  query {
    user(login: "${GITHUB_USER}") {
      email
      company
      location
      contributionsCollection {
        totalCommitContributions
      }
      repositories(
        first: 100
        ownerAffiliations: [OWNER]
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

function getLanguages(repo: GitHubUserResponse["repositories"]["nodes"][0]): Language[] {
  const filtered = repo.languages.edges.filter(
    (edge) =>
      !EXCLUDED_LANGUAGES.includes(edge.node.name.toLowerCase()) && edge.size > 100,
  );

  const totalSize = filtered.reduce((acc, edge) => acc + edge.size, 0);
  if (totalSize === 0) return [];

  return filtered.map((edge) => ({
    name: edge.node.name.toLowerCase(),
    percentage: Math.round((edge.size / totalSize) * 100),
  }));
}

function getAllLanguagesSize(
  nodes: GitHubUserResponse["repositories"]["nodes"],
): Language[] {
  const languages = nodes.reduce<Record<string, number>>((acc, node) => {
    node.languages.edges.forEach((edge) => {
      if (EXCLUDED_LANGUAGES_GLOBAL.includes(edge.node.name.toLowerCase())) return;
      acc[edge.node.name] = (acc[edge.node.name] ?? 0) + edge.size;
    });
    return acc;
  }, {});

  const mastery = Math.max(...Object.values(languages), 0);
  if (mastery === 0) return [];

  return Object.entries(languages)
    .map(([name, totalSize]) => ({
      name,
      totalSize: totalSize > mastery ? mastery : totalSize,
    }))
    .map((lang) => ({
      name: LANGUAGE_SHORTCUTS[lang.name] ?? lang.name,
      percentage: Math.round((lang.totalSize / mastery) * 100),
    }));
}

async function fetchGitHubUser(): Promise<GitHubUserResponse> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is required. Copy .env.example to .env.local and set your token.",
    );
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GITHUB_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as {
    data?: { user: GitHubUserResponse };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data?.user) {
    throw new Error("GitHub API returned no user data");
  }

  return json.data.user;
}

function resolveContactEmail(githubEmail: string | null): string {
  const email = githubEmail?.trim() || process.env.EMAIL?.trim();
  if (!email) {
    throw new Error(
      "Contact email required: GitHub profile email (user:email scope) or EMAIL in .env",
    );
  }
  return email;
}

function transformUserData(user: GitHubUserResponse): DeveloperData {
  const nodes = user.repositories.nodes.filter((repo) => repo.name !== EXCLUDED_REPO);

  const repositories: Repository[] = nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    languages: getLanguages(repo),
    url: `https://github.com/MatHoyer/${repo.name}`,
  }));

  return {
    email: resolveContactEmail(user.email),
    company: user.company,
    location: user.location,
    totalCommitContributions: user.contributionsCollection.totalCommitContributions,
    totalRepos: user.repositories.totalCount,
    languagesCount: getAllLanguagesSize(nodes),
    repositories,
  };
}

export async function getDeveloperData(): Promise<DeveloperData> {
  const user = await fetchGitHubUser();
  return transformUserData(user);
}

export async function getRepoNames(): Promise<string[]> {
  const data = await getDeveloperData();
  return data.repositories.map((r) => r.name);
}
