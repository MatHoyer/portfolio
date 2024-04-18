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
};

type FetchTab = {
  email: string;
  company: string;
  location: string;
  contributionsCollection: {
    totalCommitContributions: number;
  };
  repositories: {
    totalCount: number;
    nodes: RepositoryFetch[];
  };
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

type LanguagesTotalSize = {
  name: string;
  totalSize: number;
};

type GlobalData = {
  email: string;
  company: string;
  location: string;
  totalCommitContributions: number;
  totalRepos: number;
  languagesCount: Language[];
  repositories: Repository[];
};

// Redux
type RootStateRepos = {
  repos: GlobalData;
};

type RootStateScroll = {
  scroll: {
    scroll: number;
  };
};
