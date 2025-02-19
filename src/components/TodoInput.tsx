import { useState } from "react";
import { useTodosQuery } from "../hooks/useTodosQuery";

export const TodoInput = () => {
  const [title, setTitle] = useState<string>("");
  const { createTodo } = useTodosQuery();

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (!title.trim()) return;

      try {
        await createTodo.mutateAsync({ title: title.trim() });

        setTitle("");
      } catch (error) {
        console.error("Failed to create todo: ", error);
      }
    }
  };

  return (
    <form className="px-5 py-[14px] dark:bg-neutral-dark-very-dark-desaturated-blue bg-neutral-light-very-light-gray rounded-md relative flex items-center mb-4">
      <div className="dark:bg-neutral-dark-very-dark-grayish-blue bg-neutral-light-very-light-grayish-blue hover:bg-check-background h-5 w-5 rounded-full p-[1px] flex items-center justify-center">
        <div className="bg-neutral-light-very-light-gray dark:bg-neutral-dark-very-dark-desaturated-blue h-full w-full rounded-full" />
      </div>
      <input
        value={title}
        onKeyDown={handleKeyDown}
        onChange={handleSetTitle}
        className="dark:text-neutral-dark-light-grayish-blue focus:outline-none mx-3 flex-1 text-xs"
        placeholder="Create new todo..."
      />
    </form>
  );
};
