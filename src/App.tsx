import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Jog around the park 3x", completed: false },
    { id: 2, title: "Learn Golang", completed: false },
    { id: 3, title: "Go to the gym", completed: false },
  ]);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    title: string;
    completed: boolean;
  } | null>(null);

  const handleFilter = (filter: "all" | "active" | "completed") => {
    setFilter(filter);
  };

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
    localStorage.setItem("theme", currentTheme);
  };

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

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.body.classList.toggle("dark");
  }, [currentTheme]);

  return (
    <main className="px-6 py-12 md:px-0 md:py-[78px] dark:bg-neutral-dark-very-dark-blue bg-neutral-light-very-light-grayish-blue min-h-dvh relative">
      {currentTheme === "dark" ? (
        <>
          <img
            src="/bg-mobile-dark.jpg"
            alt="background mobile dark"
            className="absolute top-0 left-0 w-full z-0 md:hidden"
          />

          <img
            src="/bg-desktop-dark.jpg"
            alt="background desktop dark"
            className="hidden absolute top-0 left-0 w-full z-0 md:block max-h-[300px]"
          />
        </>
      ) : (
        <>
          <img
            src="/bg-mobile-light.jpg"
            alt="background mobile light"
            className="absolute top-0 left-0 w-full z-0 md:hidden"
          />

          <img
            src="/bg-desktop-light.jpg"
            alt="background desktop light"
            className="hidden absolute top-0 left-0 w-full z-0 md:block max-h-[300px]"
          />
        </>
      )}

      <section className="max-w-[540px] mx-auto space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-neutral-light-very-light-gray font-semibold text-2xl tracking-widest">
            TODO
          </h1>
          <button onClick={() => toggleTheme()}>
            {currentTheme === "dark" && (
              <img className="w-5 h-5" src="/icon-sun.svg" alt="sun" />
            )}
            {currentTheme === "light" && (
              <img className="w-5 h-5" src="/icon-moon.svg" alt="moon" />
            )}
          </button>
        </div>

        <div className="px-5 py-[14px] dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md relative flex items-center mb-4">
          <div className="dark:bg-neutral-dark-very-dark-grayish-blue bg-neutral-light-very-light-grayish-blue hover:bg-check-background h-5 w-5 rounded-full p-[1px] flex items-center justify-center">
            <div className="bg-neutral-light-very-light-gray dark:bg-neutral-dark-very-dark-desaturated-blue h-full w-full rounded-full" />
          </div>
          <input
            className="dark:text-neutral-dark-light-grayish-blue focus:outline-none mx-3 flex-1 text-xs"
            placeholder="Create new todo..."
          />
        </div>

        <div className="dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md divide-solid dark:divide-neutral-dark-very-dark-grayish-blue divide-neutral-light-light-grayish-blue divide-y-[1px]">
          {todos.map((todo) => (
            <div
              key={todo.id}
              id={String(todo.id)}
              className="relative flex items-center px-5 py-[14px] group cursor-pointer"
              draggable
              onDragStart={(event) => handleDragStart(event, todo)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, todo)}
            >
              <div className="dark:bg-neutral-dark-very-dark-grayish-blue bg-neutral-light-very-light-grayish-blue hover:bg-check-background h-5 w-5 rounded-full p-[1px] flex items-center justify-center hover:bg-linear-to-br from-[#57ddff] to-[#c058f3]">
                <div className="bg-neutral-light-very-light-gray dark:bg-neutral-dark-very-dark-desaturated-blue h-full w-full rounded-full" />
                {/* <img src="/icon-check.svg" alt="check" /> */}
              </div>
              <p className="dark:text-neutral-dark-light-grayish-blue text-neutral-light-very-dark-grayish-blue focus:outline-none mx-3 flex-1 text-xs">
                {todo.title}
              </p>
              <button className="ml-auto block sm:hidden sm:group-hover:block">
                <img className="w-3 h-3" src="/icon-cross.svg" alt="cross" />
              </button>
            </div>
          ))}
          <div className="px-5 py-[14px] flex items-center justify-between">
            <p className="dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
              5 items left
            </p>

            <div className="hidden md:block">
              <button
                onClick={() => handleFilter("all")}
                className={`font-semibold ${filter === "all" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter("active")}
                className={`font-semibold mx-[22px] ${filter === "active" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
              >
                Active
              </button>
              <button
                onClick={() => handleFilter("completed")}
                className={`font-semibold ${filter === "completed" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
              >
                Completed
              </button>
            </div>

            <button className="dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
              Clear Completed
            </button>
          </div>
        </div>

        <div className="dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md flex items-center justify-center gap-[22px] px-5 py-[14px] mb-11 md:hidden">
          <button
            onClick={() => handleFilter("all")}
            className={`font-semibold ${filter === "all" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("active")}
            className={`font-semibold ${filter === "active" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilter("completed")}
            className={`font-semibold ${filter === "completed" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
          >
            Completed
          </button>
        </div>

        <p className="text-sm dark:text-neutral-dark-darker-grayish-blue text-center text-neutral-light-dark-grayish-blue">
          Drag and drop to reorder list
        </p>
      </section>
    </main>
  );
}

export default App;
