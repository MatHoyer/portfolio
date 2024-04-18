import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const NavBar = () => {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4 w-screen top-0 fixed">
      <Link to="/">
        <h1 className="text-2xl font-bold">Mathieu HOYER</h1>
      </Link>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild>
          <Link to="/profile">Profile</Link>
        </Button>
        <Button asChild>
          <Link to="/repos">Projects</Link>
        </Button>
      </div>
    </div>
  );
};
