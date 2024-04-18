import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const NavBar = () => {
  return (
    <div className="bg-gray-800 text-white flex lg:flex-row flex-col justify-between items-center lg:p-4 p-2 w-screen top-0 fixed">
      <Link to="/portfolio">
        <h1 className="text-2xl font-bold">Mathieu HOYER</h1>
      </Link>
      <div className="lg:space-x-4 space-x-1">
        <Button asChild>
          <Link to="/portfolio">Home</Link>
        </Button>
        <Button asChild>
          <Link to="/portfolio/profile">Profile</Link>
        </Button>
        <Button asChild>
          <Link to="/portfolio/repos">Projects</Link>
        </Button>
      </div>
    </div>
  );
};
