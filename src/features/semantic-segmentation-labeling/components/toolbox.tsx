import { Slider } from '@/components/ui/slider';

import { useAnnotationOptionsStore } from '@/features/semantic-segmentation-labeling/store/useAnnotationOptions';

export const Toolbox: React.FC = () => {
  const { selectedAnnotation, brushSize, setBrushSize } = useAnnotationOptionsStore();

  return (
    <div className='my-4'>
      {selectedAnnotation === 'brush' ? (
        <div className='w-1/2 md:w-1/3 lg:1/4'>
          <h3 className='text-lg font-semibold mb-2'>Brush Size</h3>
          <Slider
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
            min={5}
            max={100}
            step={5}
          />
        </div>
      ) : null}
    </div>
  );
};
