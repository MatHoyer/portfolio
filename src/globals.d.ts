type Owner = {
    login: string;
    id: number;
    // Add more fields from the owner object as needed
};

type Repository = {
    name: string;
    description: string;
    stargazerCount: number;
    forkCount: number;

    /*void when fetch*/
    languagesTab: string[];
    url: string;

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

type RepositoriesResponse = Repository[];
