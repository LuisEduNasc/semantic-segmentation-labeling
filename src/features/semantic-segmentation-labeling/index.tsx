import { useRef } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnnotationOptions } from '@/features/semantic-segmentation-labeling/components/annotation-options';
import { ClassManagement } from '@/features/semantic-segmentation-labeling//components/class-management';
import { FabricCanvas } from '@/features/semantic-segmentation-labeling//components/fabric-canvas';
import { Toolbox } from '@/features/semantic-segmentation-labeling/components/toolbox';
import { ExportDataset } from './components/export-dataset';

const SemanticSegmentationLabeling: React.FC = () => {
  const canvasRef = useRef<{ undo: () => void }>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semantic Segmentation Labeling</CardTitle>
        <CardDescription>
          Annotate semantic segmentation data interactively using brush tools or polygon drawing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnnotationOptions />
        <Toolbox onUndo={() => canvasRef.current?.undo()} />
        <FabricCanvas forwardCanvasRef={canvasRef} />
        <ClassManagement />
        <ExportDataset />
      </CardContent>
    </Card>
  );
};

export default SemanticSegmentationLabeling;
