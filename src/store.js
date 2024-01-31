import { create } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

const store = (set) => {
  return {
    tasks: [
      { title: "Hello World", state: "PLANNED" },
      { title: "Hello World2", state: "ONGOING" },
      { title: "Hello World3", state: "DONE" },
    ],
    draggedTask: null,
    addTask: (title, state) =>
      set((store) => ({ tasks: [...store.tasks, { title, state }] })),
    deleteTask: (title) =>
      set((store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      })),
    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) =>
      set((store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      })),
  };
};

export const useTaskStore = create(persist(store, { name: "store" }));
