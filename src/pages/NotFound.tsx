import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 h-screen ">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Link to="/">
        <Button variant="outline">HOME</Button>
      </Link>
    </div>
  );
};
