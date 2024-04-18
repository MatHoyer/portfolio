import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { getIcons } from '@/icons';
import React from 'react';

export const RepoCard: React.FC<{ repo: Repository }> = ({ repo }) => {
  return (
    <Link to={`/portfolio/repo/${repo.name}`}>
      <div className="p-1 flex justify-center items-center space-x-4">
        <Card className="w-64 h-64 m-4">
          <CardContent className="flex flex-col aspect-square items-center space-y-2 justify-center p-6">
            <span className="text-3xl font-semibold top-1">{repo.name}</span>
            <div className="flex items-center justify-center font-semibold text-center">
              {repo.languages.map((language) =>
                React.cloneElement(getIcons(language.name, 25), { key: language.name })
              )}
            </div>
            <span className="font-semibold text-center">{repo.description}</span>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};
