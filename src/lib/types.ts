export type Language = {
  name: string;
  percentage: number;
};

export type Repository = {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  languages: Language[];
  url: string;
};

export type DeveloperData = {
  email: string;
  company: string | null;
  location: string | null;
  totalCommitContributions: number;
  totalRepos: number;
  languagesCount: Language[];
  repositories: Repository[];
};

type RepositoryFetch = {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  languages: {
    edges: {
      size: number;
      node: { name: string };
    }[];
  };
};

export type GitHubUserResponse = {
  email: string | null;
  company: string | null;
  location: string | null;
  contributionsCollection: {
    totalCommitContributions: number;
  };
  repositories: {
    totalCount: number;
    nodes: RepositoryFetch[];
  };
};
