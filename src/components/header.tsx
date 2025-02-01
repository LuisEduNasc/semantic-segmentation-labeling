import React from 'react';
import Container from './ui/container';

const Header: React.FC = () => {
  return (
    <header className='bg-gray-800 text-white p-4'>
      <Container>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
          Semantic Segmentation Labeling
        </h1>
      </Container>
    </header>
  );
};

export default Header;
