import { Suspense, useState } from "react";

import { useTheme } from "./hooks/useTheme";

import { FilterType } from "./types/todo";

import { BackgroundImage } from "./components/BackgroundImage";
import { TodoHeader } from "./components/TodoHeader";
import { TodoCard } from "./components/TodoCard";
import { TodoInput } from "./components/TodoInput";
import { TodoFilter } from "./components/TodoFilter";
import { TodoCardLoader } from "./components/TodoCardLoader";

import { useSocketManager } from "./hooks/useSocketManager";

function App() {
  useSocketManager()

  const [filter, setFilter] = useState<FilterType>("all");

  const { currentTheme, toggleTheme } = useTheme();

  // const [draggedItem, setDraggedItem] = useState<{
  //   id: number;
  //   title: string;
  //   completed: boolean;
  // } | null>(null);

  // const handleDragStart = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   todo: { id: number; title: string; completed: boolean },
  // ) => {
  //   e.dataTransfer.setData("text/plain", e.currentTarget.id);
  //   setDraggedItem(todo);
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  // const handleDragEnd = () => {
  //   setDraggedItem(null);
  // };

  // const handleDrop = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   targetTodo: { id: number; title: string; completed: boolean },
  // ) => {
  //   e.preventDefault();
  //
  //   if (!draggedItem || draggedItem.id === targetTodo.id) return;
  //
  //   const newTodos = [...todos];
  //   const draggedIndex = todos.findIndex((todo) => todo.id === draggedItem.id);
  //   const targetIndex = todos.findIndex((todo) => todo.id === targetTodo.id);
  //
  //   newTodos.splice(draggedIndex, 1);
  //   newTodos.splice(targetIndex, 0, draggedItem);
  //
  //   setTodos(newTodos);
  // };

  return (
    <main className="px-6 py-12 md:px-0 md:py-[78px] dark:bg-neutral-dark-very-dark-blue bg-neutral-light-very-light-grayish-blue min-h-dvh relative">
      <BackgroundImage theme={currentTheme} />

      <section className="max-w-[540px] mx-auto space-y-4 relative z-10">
        <TodoHeader currentTheme={currentTheme} onToggleTheme={toggleTheme} />
        <TodoInput />

        <div className="dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md divide-solid dark:divide-neutral-dark-very-dark-grayish-blue divide-neutral-light-light-grayish-blue divide-y-[1px]">
          <Suspense fallback={<TodoCardLoader />}>
            <TodoCard filter={filter} setFilter={setFilter} />
          </Suspense>
        </div>

        <TodoFilter
          filter={filter}
          onFilter={setFilter}
          className="dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md flex items-center justify-center gap-[22px] px-5 py-[14px] mb-11 md:hidden
"
        />

        <p className="text-sm dark:text-neutral-dark-darker-grayish-blue text-center text-neutral-light-dark-grayish-blue">
          Drag and drop to reorder list
        </p>
      </section>
    </main>
  );
}

export default App;
