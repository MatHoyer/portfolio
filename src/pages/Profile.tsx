import { RoundProfilePicture } from '@/components/RoundProfilePicture';
import SkillChart from '@/components/SkillChart';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <SkillChart />
      </div>
      <div className="space-x-4">
        <Button variant={'outline'} asChild>
          <a href={`https://github.com/MatHoyer`} target="_blank">
            Check it on GitHub
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <Link to="/contact-me">Contact me</Link>
        </Button>
      </div>
    </div>
  );
};
