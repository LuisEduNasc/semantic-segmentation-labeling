import { useState } from 'react';
import { Eraser, Undo } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAnnotationOptionsStore } from '@/features/semantic-segmentation-labeling/store/useAnnotationOptions';

type ToolboxProps = {
  onUndo: () => void;
};

export const Toolbox: React.FC<ToolboxProps> = ({ onUndo }) => {
  const [effect, setEffect] = useState<boolean>(false);

  const {
    selectedAnnotation,
    brushSize,
    setBrushSize,
    eraserActive,
    setEraserActive,
    annotations,
  } = useAnnotationOptionsStore();

  const handleEraserClick = () => {
    setEffect(true);
    onUndo();
  };

  return (
    <div className='flex items-start gap-4 my-4'>
      {selectedAnnotation === 'brush' ? (
        <>
          <div className='w-1/2 md:w-1/3 lg:w-1/4'>
            <h3 className='text-lg font-semibold mb-2'>Brush Size</h3>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              min={5}
              max={100}
              step={5}
            />
          </div>

          <Button
            variant={eraserActive ? 'default' : 'secondary'}
            onClick={() => setEraserActive(!eraserActive)}
            title='Eraser'
          >
            <Eraser />
          </Button>
        </>
      ) : null}

      {annotations.length ? (
        <Button
          variant='secondary'
          onClick={handleEraserClick}
          title='Undo'
          className={`${effect && 'animate-wiggle'}`}
          onAnimationEnd={() => setEffect(false)}
        >
          <Undo />
        </Button>
      ) : null}
    </div>
  );
};
