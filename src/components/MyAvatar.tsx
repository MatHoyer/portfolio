import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export const MyAvatar = () => {
    return (
        <Card className="flex items-center justify-center p-4 rounded-lg shadow-md overflow-hidden max-w-md max-h-64">
            <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="h-screen flex flex-col justify-center items-center">
                    <Avatar className="w-20 h-20 rounded-full">
                        <AvatarImage src="https://github.com/mathoyer.png" alt="profile picture" />
                        <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                    <h1 className="text-4xl">Mathieu HOYER</h1>
                </div>
            </CardContent>
        </Card>
    );
};
