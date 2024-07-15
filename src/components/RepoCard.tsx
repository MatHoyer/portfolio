import { getLanguageIcon } from '@/icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

export const RepoCard: React.FC<{ repo: Repository; fromPage?: string }> = ({ repo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/repo/${repo.name}`, { state: { from: location.pathname } });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="p-1 flex justify-center items-center space-x-4">
        <Card className="card h-64 w-64 m-4">
          <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
            <span className="text-3xl font-semibold top-1">{repo.name}</span>
            <div className="flex items-center justify-center font-semibold text-center">
              {repo.languages.map((language) =>
                React.cloneElement(getLanguageIcon(language.name) ?? <></>, { key: language.name })
              )}
            </div>
            <span className="font-semibold text-center">{repo.description}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
