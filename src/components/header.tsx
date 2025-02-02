import React from 'react';

import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';

const Header: React.FC = () => {
  return (
    <header className='bg-white text-gray-800 p-4'>
      <Container>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl pb-4'>
          Semantic Segmentation Labeling
        </h1>

        <Separator />
      </Container>
    </header>
  );
};

export default Header;
