import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LanguageSelect } from './LanguageSelect';
import { RepoCard } from './RepoCard';
import { Button } from './ui/button';

export const ReposCarousel: React.FC = () => {
  const repos = useSelector((state: RootStateRepos) => state.repos.repositories);
  const [selected, setSelected] = React.useState('all');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const fRepos = repos.filter((repo) => {
    if (selected === 'all') return true;
    return repo.languages.some((language) => language.name === selected);
  });

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-4 w-full">
        <LanguageSelect handleSelect={handleSelect} />
        <Link to="/repos">
          <Button variant="outline">View all</Button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className={cn(fRepos.length < 3 && ' flex justify-center items-center')}>
            {fRepos.map((repo) => (
              <CarouselItem key={repo.name} className="basis-full lg:basis-1/2 xl:basis-1/3">
                <RepoCard repo={repo} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {fRepos.length > 3 && <CarouselPrevious />}
          {fRepos.length > 3 && <CarouselNext />}
        </Carousel>
      </div>
    </div>
  );
};
