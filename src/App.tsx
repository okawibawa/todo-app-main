import React, { useState } from "react";

import { useTheme } from "./hooks/useTheme";

import { BackgroundImage } from "./components/BackgroundImage";
import { TodoHeader } from "./components/TodoHeader";
import { TodoInput } from "./components/TodoInput";
import { TodoItem } from "./components/TodoItem";
import { TodoFilter } from "./components/TodoFilter";
import { FilterType } from "./types/todo";

function App() {
  const { currentTheme, toggleTheme } = useTheme();

  const [filter, setFilter] = useState<FilterType>("all");
  const [todos, setTodos] = useState([
    { id: 1, title: "Jog around the park 3x", completed: false },
    { id: 2, title: "Learn Golang", completed: false },
    { id: 3, title: "Go to the gym", completed: false },
  ]);
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    title: string;
    completed: boolean;
  } | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    todo: { id: number; title: string; completed: boolean },
  ) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    setDraggedItem(todo);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetTodo: { id: number; title: string; completed: boolean },
  ) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetTodo.id) return;

    const newTodos = [...todos];
    const draggedIndex = todos.findIndex((todo) => todo.id === draggedItem.id);
    const targetIndex = todos.findIndex((todo) => todo.id === targetTodo.id);

    newTodos.splice(draggedIndex, 1);
    newTodos.splice(targetIndex, 0, draggedItem);

    setTodos(newTodos);
  };

  return (
    <main className="px-6 py-12 md:px-0 md:py-[78px] dark:bg-neutral-dark-very-dark-blue bg-neutral-light-very-light-grayish-blue min-h-dvh relative">
      <BackgroundImage theme={currentTheme} />

      <section className="max-w-[540px] mx-auto space-y-4 relative z-10">
        <TodoHeader currentTheme={currentTheme} onToggleTheme={toggleTheme} />
        <TodoInput />

        <div className="dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md divide-solid dark:divide-neutral-dark-very-dark-grayish-blue divide-neutral-light-light-grayish-blue divide-y-[1px]">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
          <div className="px-5 py-[14px] flex items-center justify-between">
            <p className="dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
              5 items left
            </p>

            <TodoFilter
              filter={filter}
              onFilter={setFilter}
              className="hidden md:flex items-center gap-3"
            />

            <button className="dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
              Clear Completed
            </button>
          </div>
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
