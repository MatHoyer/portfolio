import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { icons } from '@/icons';
import { LanguageSelect } from './LanguageSelect';

type Props = {
    repos: Repository[];
};

export const ReposCarousel: React.FC<Props> = ({ repos }) => {
    const [selected, setSelected] = React.useState('all');
    const [iconsTab] = React.useState<string[]>(Object.keys(icons));

    const handleSelect = (value: string) => {
        console.log(value);
        setSelected(value);
    };

    repos = repos.filter((repo) => {
        if (selected === 'all') return true;
        return repo.languagesTab.includes(selected);
    });

    return (
        <div className="flex flex-col items-center">
            <LanguageSelect tab={iconsTab} handleSelect={handleSelect} />
            <div className="w-full flex justify-center items-center">
                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    className="w-full max-w-5xl"
                >
                    <CarouselContent>
                        {repos.map((repo) => (
                            <CarouselItem key={repo.name} className="md:basis-1/2 lg:basis-1/3">
                                <a href={repo.url} target="_blank">
                                    <div className="p-1">
                                        <Card className="transform transition duration-500 ease-in-out hover:scale-90 active:scale-100">
                                            <CardContent className="flex flex-col aspect-square items-center space-y-2 justify-center p-6">
                                                <span className="text-3xl font-semibold top-1">{repo.name}</span>
                                                <div className="flex items-center justify-center font-semibold text-center">
                                                    {repo.languagesTab.map((name) => icons[name])}
                                                </div>
                                                <span className="font-semibold text-center">{repo.description}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {repos.length > 3 && <CarouselPrevious />}
                    {repos.length > 3 && <CarouselNext />}
                </Carousel>
            </div>
        </div>
    );
};
