import { RepoCard } from '@/components/RepoCard';
import { capitalize } from '@/lib/utils';
import { useSelector } from 'react-redux';

export const ReposList = () => {
  const repos = useSelector((state: RootState) => state.repos.repos);
  const allLanguages = [...new Set(repos.flatMap((repo) => repo.languages.map((lang) => lang.name)))];

  return (
    <div className="h-screen pt-20 overflow-auto">
      <div className="flex flex-col justify-center items-center space-y-10">
        {allLanguages.map((lang) => {
          const fRepos = repos.filter((repo) => repo.languages.some((language) => language.name === lang));
          return (
            <div key={lang}>
              <h1 className="text-4xl">{capitalize(lang)}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {fRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
