import React, { useEffect, useRef, useState } from 'react';
import { Canvas, PencilBrush, FabricImage } from 'fabric';
import { Input } from '@/components/ui/input';
import { useClassesStore } from '../store/useClasses';

export const FabricCanvas: React.FC = () => {
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.9);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.7);

  const canvasRef = useRef<Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const { getSelectedClass } = useClassesStore();

  const initCanvas = () => {
    if (!canvasRef.current) {
      const canvasElement = document.getElementById('drawing-canvas') as HTMLCanvasElement;
      if (canvasElement) {
        const canvas = new Canvas(canvasElement, {
          isDrawingMode: true,
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: '#FFFFFF',
        });

        const pencilBrush = new PencilBrush(canvas);
        pencilBrush.color = getSelectedClass()?.color || '#000000';
        pencilBrush.width = 5;
        canvas.freeDrawingBrush = pencilBrush;

        canvasRef.current = canvas;
      }
    }
  };

  const handleLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();

        img.onload = function () {
          const imjObg = new FabricImage(img, {
            centeredRotation: true,
            centeredScaling: true,
            scaleX: 1,
            scaleY: 1,
            perPixelTargetFind: false,
            selectable: true,
          });

          canvasRef.current?.add(imjObg);
          canvasRef.current?.renderAll();
        };

        img.crossOrigin = 'anonymous';
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.7;
      setCanvasWidth(width);
      setCanvasHeight(height);

      if (canvasRef.current) {
        canvasRef.current.setDimensions({ width, height });
        canvasRef.current.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col items-center gap-4 my-4 p-4'>
      <div className='flex gap-2'>
        <Input type='file' accept='image/*' onChange={handleLoadImage} />
      </div>
      <div ref={canvasContainerRef}>
        <canvas id='drawing-canvas' />
      </div>
    </div>
  );
};
