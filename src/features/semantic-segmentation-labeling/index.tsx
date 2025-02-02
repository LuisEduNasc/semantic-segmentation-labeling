import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnnotationOptions } from '@/features/semantic-segmentation-labeling/components/annotation-options';
import { ClassManagement } from './components/class-management';

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
        <ClassManagement />
      </CardContent>
    </Card>
  );
};

export default SemanticSegmentationLabeling;
