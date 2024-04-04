type Owner = {
    login: string;
    id: number;
    // Add more fields from the owner object as needed
};

type Repository = {
    id: number;
    name: string;
    full_name: string;
    owner: Owner;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
    pushed_at: string; // ISO 8601 format
    git_url: string;
    ssh_url: string;
    clone_url: string;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    default_branch: string;
    languages_url: string;
    languages: string;
    // Add more fields as needed
};

type RepositoriesResponse = Repository[];
