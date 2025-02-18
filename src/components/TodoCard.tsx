import { useFilteredTodosQuery } from "../hooks/useFilteredTodosQuery";
import { FilterType } from "../types/todo";
import { TodoFilter } from "./TodoFilter";

import { TodoItem } from "./TodoItem";

export const TodoCard = ({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}) => {
  const { todos } = useFilteredTodosQuery(filter);

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          // onDragStart={handleDragStart}
          // onDragEnd={handleDragEnd}
          // onDragOver={handleDragOver}
          // onDrop={handleDrop}
        />
      ))}
      <div className="px-5 py-[14px] flex items-center justify-between">
        <p className="dark:text-neutral-dark-dark-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
          {todos.length} items left
        </p>

        <TodoFilter
          filter={filter}
          onFilter={setFilter}
          className="hidden md:flex items-center gap-3"
        />

        <button className="dark:text-neutral-dark-dark-grayish-blue text-neutral-light-dark-grayish-blue text-xs">
          Clear Completed
        </button>
      </div>
    </>
  );
};
