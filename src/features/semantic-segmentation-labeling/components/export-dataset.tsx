import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAnnotationOptionsStore } from '@/features/semantic-segmentation-labeling/store/useAnnotationOptions';
import { useClassesStore } from '@/features/semantic-segmentation-labeling/store/useClasses';

export const ExportDataset: React.FC = () => {
  const { imageInfo, annotations } = useAnnotationOptionsStore();
  const { classes } = useClassesStore();

  const exportDataSet = () => {
    const data = {
      info: {
        description: `Annotations dataset`,
        dateCreated: new Date().toLocaleDateString(),
      },
      images: [imageInfo],
      annotations,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categories: classes.map(({ selected, ...rest }) => rest),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', href);
    downloadAnchor.setAttribute('download', 'annotations.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <Button
      onClick={exportDataSet}
      className='w-full md:w-auto flex justify-center items-center gap-1 my-4'
    >
      <Download />
      Export Dataset
    </Button>
  );
};
