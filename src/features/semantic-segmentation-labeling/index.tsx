import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnnotationOptions } from '@/features/semantic-segmentation-labeling/components/annotation-options';
import { ClassManagement } from '@/features/semantic-segmentation-labeling//components/class-management';
import { FabricCanvas } from '@/features/semantic-segmentation-labeling//components/fabric-canvas';
import { Toolbox } from './components/toolbox';

const SemanticSegmentationLabeling: React.FC = () => {
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
        <Toolbox />
        <FabricCanvas />
        <ClassManagement />
      </CardContent>
    </Card>
  );
};

export default SemanticSegmentationLabeling;
