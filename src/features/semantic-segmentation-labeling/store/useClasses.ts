import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

interface Class {
  id: string;
  name: string;
  color: string;
  selected: boolean;
}

type ClassesStore = {
  classes: Class[];
  addClass: (newClass: Class) => void;
  editClass: (id: string, name: string) => void;
  deleteClass: (id: string) => void;
  selectClass: (id: string) => void;
  getSelectedClass: () => Class | undefined;
};

export const useClassesStore = create<ClassesStore>()(
  devtools(
    persist(
      (set, get) => ({
        classes: [],
        addClass: (newClass: Class) => {
          const currentClasses = get().classes;
          set({ classes: [...currentClasses, newClass] });
        },
        editClass: (id: string, name: string) => {
          const currentClasses = get().classes;
          const classIndex = currentClasses.findIndex((c) => c.id === id);
          const updatedClasses = [...currentClasses];
          updatedClasses[classIndex] = { ...updatedClasses[classIndex], name: name };
          set({ classes: updatedClasses });
        },
        deleteClass: (id: string) => {
          const currentClasses = get().classes;
          const updatedClasses = currentClasses.filter((c) => c.id !== id);
          set({ classes: updatedClasses });
        },
        selectClass: (id: string) => {
          const currentClasses = get().classes;
          const classIndex = currentClasses.findIndex((c) => c.id === id);
          const updatedClasses = [...currentClasses];
          updatedClasses.forEach((c, index) => {
            if (index !== classIndex) {
              updatedClasses[index] = { ...c, selected: false };
            } else {
              updatedClasses[index] = { ...c, selected: true };
            }
          });
          set({ classes: updatedClasses });
        },
        getSelectedClass: () => {
          const currentClasses = get().classes;
          return currentClasses.find((c) => c.selected);
        },
      }),
      {
        name: 'classes',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
