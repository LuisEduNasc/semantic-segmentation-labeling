import { LoaderCircle } from 'lucide-react';
import { Button } from './button';

const ButtonSkeleton = () => {
  return (
    <Button className='w-full md:w-auto flex justify-center items-center gap-1 my-4 animate-pulse'>
      <LoaderCircle className='animate-spin' />
    </Button>
  );
};

export default ButtonSkeleton;
