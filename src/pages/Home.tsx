import { MyAvatar } from '@/components/MyAvatar';
import { ReposCarousel } from '@/components/ReposCarousel';

export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-screen w-screen">
            <MyAvatar />
            <div className="w-1/2">
                <ReposCarousel />
            </div>
        </div>
    );
};
