import { Button } from '@/components/ui/button';
import { getLanguageIcon } from '@/icons';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from './NotFound';

export const Repo = () => {
  const repoName = useParams<{ repoName: string }>().repoName;
  const repos = useSelector((state: RootStateRepos) => state.repos.repositories);
  const repo = repos.find((repo) => repo.name === repoName);
  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(from, { state: { from: location.pathname } });
  };

  if (!repo) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-10">
      <h1 className="text-4xl">{repo.name}</h1>
      <div className="flex justify-center">
        {repo.languages.map((lang) => (
          <div key={lang.name} className="flex flex-col items-center">
            {getLanguageIcon(lang.name, 50)}
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
      {!!from && (
        <Button variant={'ghost'} asChild>
          <div onClick={handleClick}>Go back</div>
        </Button>
      )}
    </div>
  );
};
