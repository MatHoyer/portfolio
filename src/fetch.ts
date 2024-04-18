export const fetchRepos = async () => {
  const userId = 'mathoyer';
  const token = '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';
  const response = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "${userId}") {
            email
            company
            location
            contributionsCollection {
              totalCommitContributions
            }
            repositories(first: 100, ownerAffiliations: [OWNER], orderBy: { field: STARGAZERS, direction: DESC }) {
              totalCount
              nodes {
                name
                description
                stargazerCount
                forkCount
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history {
                        totalCount
                      }
                    }
                  }
                }
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
        `,
    }),
  });
  return (await response.json()).data.user;
};
