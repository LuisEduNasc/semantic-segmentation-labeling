import SemanticSegmentationLabeling from '@/features/semantic-segmentation-labeling';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className='p-4'>
      <SemanticSegmentationLabeling />
    </div>
  );
};
