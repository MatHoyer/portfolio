import { RoundProfilePicture } from '@/components/RoundProfilePicture';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full bg-indigo-200 rounded-lg">
      <div className="h-2 bg-indigo-700 rounded-lg" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export const Profile = () => {
  const globalData = useSelector((state: RootStateRepos) => state.repos);

  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-10">
      <RoundProfilePicture size="big" />
      <h1 className="text-4xl">Mathieu HOYER</h1>
      <h2 className="text-2xl">
        {globalData.company} at {globalData.location}
      </h2>
      <p>
        {globalData.totalCommitContributions} commits on {globalData.totalRepos} repositories.
      </p>
      <div className="flex flex-col space-y-2">
        {globalData.languagesCount.map((lang) => (
          <div key={lang.name} className="grid grid-cols-2 items-center space-x-4">
            <p className="text-right">{lang.name}</p>
            <ProgressBar percentage={lang.percentage} />
          </div>
        ))}
      </div>
      <div className="space-x-4">
        <Button variant={'outline'} asChild>
          <a href={`https://github.com/MatHoyer`} target="_blank">
            Check it on GitHub
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <Link to="/portfolio/contact-me">Contact me</Link>
        </Button>
      </div>
    </div>
  );
};
