import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

type Props = {
    repos: Repository[];
};

export const MyCarousel: React.FC<Props> = ({ repos }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Carousel className="w-full max-w-xs ">
                <CarouselContent>
                    {repos.map((repo, index) => (
                        <CarouselItem key={index}>
                            <a href={repo.clone_url}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <div className="flex flex-col aspect-square items-center justify-center">
                                                <div className="text-4xl font-semibold mb-10">{repo.name}</div>
                                                <div className="font-semibold mb-10">{repo.description}</div>
                                                <div className="text-2xl font-semibold">{repo.language}</div>
                                            </div>
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
