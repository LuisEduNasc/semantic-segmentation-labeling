import { Brush, PenTool } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnnotationOptionsStore } from '@/features/semantic-segmentation-labeling/store/useAnnotationOptions';

export const AnnotationOptions: React.FC = () => {
  const { selectedAnnotation, setSelectedAnnotation } = useAnnotationOptionsStore();

  return (
    <div>
      <Tabs
        value={selectedAnnotation}
        onValueChange={(value) => {
          setSelectedAnnotation(value as 'brush' | 'polygon');
        }}
      >
        <TabsList className='grid grid-cols-2 gap-2 h-12 px-4'>
          <TabsTrigger value='brush' title='Brush'>
            <Brush />
          </TabsTrigger>
          <TabsTrigger value='polygon' title='Polygon'>
            <PenTool />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
