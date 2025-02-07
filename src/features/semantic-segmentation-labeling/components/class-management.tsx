import { useRef, useState } from 'react';
import { Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useClassesStore } from '@/features/semantic-segmentation-labeling/store/useClasses';
import { hexy } from '@/utils/random-color';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const ClassManagement: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const { classes, addClass, editClass, deleteClass, selectClass } = useClassesStore();

  const classRef = useRef<HTMLInputElement>(null);

  const handleAddClass = () => {
    const newClass = {
      id: Math.random().toString(36).substring(7),
      name: `Class ${classes.length + 1}`,
      color: hexy(),
      selected: false,
    };
    addClass(newClass);
  };

  const handleEditStart = (id: string) => {
    setEditingId(id);
  };

  const handleEditSubmit = (id: string) => {
    const newName = classRef.current?.value;
    if (newName) {
      editClass(id, newName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className='mt-4 border-2 border-slate-100 rounded-lg p-4'>
      <div>
        <h3 className='text-lg'>Classes</h3>
        <small className='text-sm text-muted-foreground'>
          Click a class to select it, or click its title to edit the name.
        </small>
      </div>
      <div className='flex flex-col gap-4 md:flex-row md:justify-between mt-4'>
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {classes.map((value) => (
            <li
              key={value.id}
              className={cn(
                'relative flex items-center justify-center px-8 py-1 rounded-xl font-medium h-10 border-2 ease-in-out transition-all',
                value.selected
                  ? 'border-stone-500 shadow-lg shadow-stone-500/50'
                  : 'border-slate-200 border-opacity-50',
              )}
              style={{ borderLeftColor: value.color, borderLeftWidth: '8px' }}
              onClick={() => selectClass(value.id)}
            >
              {editingId === value.id ? (
                <Input
                  ref={classRef}
                  type='text'
                  autoFocus
                  className='w-full border-transparent focus-visible:border-transparent focus-visible:ring-0 text-sm h-6'
                  onBlur={() => handleEditSubmit(value.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(value.id)}
                />
              ) : (
                <span onClick={() => handleEditStart(value.id)}>{value.name}</span>
              )}

              <Button
                variant='destructive'
                className='absolute right-[-12px] top-[-12px] cursor-pointer rounded-full py-1 px-1 h-fit'
                onClick={() => deleteClass(value.id)}
              >
                <Trash />
              </Button>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleAddClass}
          className='w-full md:w-auto flex justify-center items-center gap-1'
        >
          <Plus />
          Add class
        </Button>
      </div>
    </div>
  );
};
