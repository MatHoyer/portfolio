import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { C, Cplusplus, Docker, JavaScript, Python, TypeScript } from './Logo';

const icons: Record<string, JSX.Element> = {
    javascript: <JavaScript height={25} width={25} />,
    'c++': <Cplusplus height={25} width={25} />,
    c: <C height={25} width={25} />,
    typescript: <TypeScript height={25} width={25} />,
    python: <Python height={25} width={25} />,
    dockerfile: <Docker height={25} width={25} />,
};

type Props = {
    repos: Repository[];
};

export const MyCarousel: React.FC<Props> = ({ repos }) => {
    return (
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
                                    <Card>
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
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
