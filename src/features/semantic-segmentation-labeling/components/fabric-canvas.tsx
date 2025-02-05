import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Canvas,
  PencilBrush,
  FabricImage,
  Path,
  FabricObject,
  FabricObjectProps,
  SerializedObjectProps,
  ObjectEvents,
  Point,
  Polygon,
} from 'fabric';
import { Input } from '@/components/ui/input';
import { useClassesStore } from '@/features/semantic-segmentation-labeling/store/useClasses';
import { useAnnotationOptionsStore } from '@/features/semantic-segmentation-labeling/store/useAnnotationOptions';

type FabricCanvasProps = {
  forwardCanvasRef: React.RefObject<{
    undo: () => void;
  } | null>;
};

export const FabricCanvas: React.FC<FabricCanvasProps> = ({ forwardCanvasRef }) => {
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.9);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.7);
  const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);

  const canvasRef = useRef<Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const { getSelectedClass } = useClassesStore();
  const {
    brushSize,
    eraserActive,
    setEraserActive,
    annotations,
    setAnnotation,
    removeLastAnnotation,
    setImageInfo,
    imageInfo,
    selectedAnnotation,
  } = useAnnotationOptionsStore();

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

        updateBrush(canvas);
        canvasRef.current = canvas;
      }
    }
  };

  const updateBrush = (canvas: Canvas) => {
    if (selectedAnnotation === 'brush') {
      if (eraserActive) {
        const eraserBrush = new PencilBrush(canvas);
        eraserBrush.width = brushSize;
        canvas.freeDrawingBrush = eraserBrush;

        canvas.on('path:created', (event) => {
          if (event.path) {
            const path = event.path;
            path.globalCompositeOperation = 'destination-out';
            path.selectable = false;
            canvas.renderAll();
          }
        });
      } else {
        canvas.off('path:created');
        const pencilBrush = new PencilBrush(canvas);
        pencilBrush.color = getSelectedClass()?.color
          ? `${getSelectedClass()!.color}80`
          : '#00000080';
        pencilBrush.width = brushSize;
        canvas.freeDrawingBrush = pencilBrush;
      }
    } else {
      canvas.isDrawingMode = false;
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
      enablePolygonDrawing(canvas);
    }
  };

  const enablePolygonDrawing = (canvas: Canvas) => {
    canvas.on('mouse:down', (event) => {
      if (!event.pointer) return;
      const point = new Point(event.pointer.x, event.pointer.y);
      setPolygonPoints((prevPoints) => [...prevPoints, point]);
    });

    canvas.on('mouse:dblclick', () => {
      if (polygonPoints.length > 2) {
        const polygon = new Polygon(polygonPoints, {
          fill: `${getSelectedClass()?.color || '#000000'}80`,
          selectable: false,
        });
        canvas.add(polygon);
        setAnnotation({
          id: Date.now(),
          imageId: imageInfo?.id || null,
          categoryId: getSelectedClass()!.id,
          segmentation: polygonPoints.map((p) => [p.x, p.y]),
          bbox: [
            Math.min(...polygonPoints.map((p) => p.x)),
            Math.min(...polygonPoints.map((p) => p.y)),
            Math.max(...polygonPoints.map((p) => p.x)),
            Math.max(...polygonPoints.map((p) => p.y)),
          ],
          area: polygon.width * polygon.height,
          path: polygon,
        });
        setPolygonPoints([]);
      }
    });
  };

  const handleLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();

        img.onload = function () {
          setImageInfo({
            id: 1,
            fileName: file.name,
            width: img.width,
            height: img.height,
          });

          const imjObg = new FabricImage(img, {
            centeredRotation: true,
            centeredScaling: true,
            scaleX: 1,
            scaleY: 1,
            perPixelTargetFind: false,
            selectable: false,
            evented: false,
          });

          canvasRef.current?.clear();
          canvasRef.current?.add(imjObg);
          canvasRef.current?.sendObjectToBack(imjObg);
          canvasRef.current?.renderAll();
        };

        img.crossOrigin = 'anonymous';
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUndo = () => {
    if (canvasRef.current && annotations.length > 0) {
      const updatedAnnotations = [...annotations];
      const lastAnnotation = updatedAnnotations.pop();
      canvasRef.current.remove(
        lastAnnotation?.path as FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >,
      );
      removeLastAnnotation();
      canvasRef.current.renderAll();
    }
  };

  const trackPaths = (canvas: Canvas) => {
    canvas.on('path:created', (event) => {
      if (event.path) {
        const path = event.path;
        const newBboxAnnotation = path as Path;
        const bbox = [path.left, path.top, path.width, path.height];
        newBboxAnnotation.selectable = false;
        setAnnotation({
          id: Date.now(),
          imageId: imageInfo?.id || null,
          categoryId: getSelectedClass()!.id,
          segmentation: event.path.getCoords(),
          bbox,
          area: newBboxAnnotation.width * newBboxAnnotation.height,
          path,
        });
      }
    });
  };

  useImperativeHandle(forwardCanvasRef, () => ({
    undo: handleUndo,
  }));

  useEffect(() => {
    initCanvas();
    setEraserActive(false);

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

  useEffect(() => {
    if (canvasRef.current) {
      updateBrush(canvasRef.current);
      trackPaths(canvasRef.current);
    }
  }, [getSelectedClass()?.color, brushSize, eraserActive, selectedAnnotation]);

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
