import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { RoundProfilePicture } from './RoundProfilePicture';

export const MyAvatar = () => {
  return (
    <Card className="avatar flex items-center justify-center p-4 rounded-lg shadow-md overflow-hidden max-w-md max-h-64">
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <Link to="/portfolio/profile">
          <div className="h-screen flex flex-col justify-center items-center">
            <RoundProfilePicture />
            <h1 className="text-2xl sm:text-4xl">Mathieu HOYER</h1>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
