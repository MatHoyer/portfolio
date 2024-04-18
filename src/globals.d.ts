type Owner = {
  login: string;
  id: number;
  // Add more fields from the owner object as needed
};

type RepositoryFetch = {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;

  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
  languages: {
    edges: {
      size: number;
      node: {
        name: string;
      };
    }[];
  };
  owner: Owner;
  // Add more fields from the repository object as needed
};

type Language = {
  name: string;
  percentage: number;
};

type Repository = {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  languages: Language[];
  url: string;
};

// Redux
type RootStateRepos = {
  repos: {
    repos: Repository[];
  };
};

type RootStateScroll = {
  scroll: {
    scroll: number;
  };
};
