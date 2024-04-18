import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { getIcons } from '@/icons';
import { Button } from '@/components/ui/button';

export const Repo = () => {
  const repoName = useParams<{ repoName: string }>().repoName;
  const repos = useSelector((state: RootState) => state.repos.repos);
  const repo = repos.find((repo) => repo.name === repoName);

  if (!repo) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-10">
      <h1 className="text-4xl">{repo.name}</h1>
      <div className="flex justify-center">
        {repo.languages.map((lang) => (
          <div key={lang.name} className="flex flex-col items-center">
            {getIcons(lang.name, 50)}
            <span>{lang.percentage}%</span>
          </div>
        ))}
      </div>
      <p>{repo.description}</p>
      <Button variant={'outline'} asChild>
        <a href={repo.url} target="_blank">
          Check it on GitHub
        </a>
      </Button>
    </div>
  );
};
