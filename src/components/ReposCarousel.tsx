import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { icons } from '@/icons';
import { LanguageSelect } from './LanguageSelect';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { RepoCard } from './RepoCard';

export const ReposCarousel: React.FC = () => {
  const repos = useSelector((state: RootStateRepos) => state.repos.repositories);
  const [selected, setSelected] = React.useState('all');
  const [iconsTab] = React.useState<string[]>(Object.keys(icons));

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
        <LanguageSelect tab={iconsTab} handleSelect={handleSelect} />
        <Link to="/portfolio/repos">
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
              <CarouselItem key={repo.name} className="basis-full md:basis-1/2 lg:basis-1/3">
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
