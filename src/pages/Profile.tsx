import { RoundProfilePicture } from '@/components/RoundProfilePicture';
import { Button } from '@/components/ui/button';

export const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-20 space-y-10">
      <RoundProfilePicture size={64} />
      <h1 className="text-4xl">Mathieu HOYER</h1>
      <Button variant={'outline'} asChild>
        <a href={`https://github.com/MatHoyer`} target="_blank">
          Check it on GitHub
        </a>
      </Button>
    </div>
  );
};
