import { RoundProfilePicture } from '@/components/RoundProfilePicture';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

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
        {globalData.contributionsCollection.totalCommitContributions} commits on {globalData.totalRepos} repositories.
      </p>
      <Button variant={'outline'} asChild>
        <a href={`https://github.com/MatHoyer`} target="_blank">
          Check it on GitHub
        </a>
      </Button>
    </div>
  );
};
