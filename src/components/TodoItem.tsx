import { Todo } from "../types/todo";
import { useTodosQuery } from "../hooks/useTodosQuery";

interface TodoItem {
  todo: Todo;
  // onDragStart: (event: React.DragEvent<HTMLDivElement>, todo: Todo) => void; onDragEnd: () => void;
  // onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  // onDrop: (event: React.DragEvent<HTMLDivElement>, todo: Todo) => void;
}

export const TodoItem = ({
  todo,
  // onDragStart,
  // onDragEnd,
  // onDragOver,
  // onDrop,
}: TodoItem) => {
  const { updateTodo, deleteTodo } = useTodosQuery();

  const handleToggleComplete = async () => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        payload: { completed: !todo.completed },
      });
    } catch (error) {
      console.error("Faled to update todo: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo.mutateAsync(todo.id);
    } catch (error) {
      console.error("Failed to delete todo: ", error);
    }
  };

  return (
    <div
      key={todo.id}
      id={String(todo.id)}
      className="relative flex items-center px-5 py-[14px] group cursor-pointer"
      draggable
    // onDragStart={(event) => onDragStart(event, todo)}
    // onDragEnd={onDragEnd}
    // onDragOver={onDragOver}
    // onDrop={(e) => onDrop(e, todo)}
    >
      <button
        onClick={handleToggleComplete}
        className={`${todo.completed ? "bg-linear-to-br from-[#57ddff] to-[#c058f3]" : "dark:bg-neutral-dark-very-dark-grayish-blue bg-neutral-light-very-light-grayish-blue hover:bg-linear-to-br from-[#57ddff] to-[#c058f3] cursor-pointer"} hover:bg-check-background h-5 w-5 rounded-full p-[1px] flex items-center justify-center`}
      >
        {todo.completed ? (
          <img src="/icon-check.svg" alt="check" />
        ) : (
          <div className="bg-neutral-light-very-light-gray dark:bg-neutral-dark-very-dark-desaturated-blue h-full w-full rounded-full" />
        )}
      </button>
      <p
        className={`focus:outline-none mx-3 flex-1 text-xs ${todo.completed ? "line-through dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue" : "dark:text-neutral-dark-light-grayish-blue text-neutral-light-very-dark-grayish-blue"}`}
      >
        {todo.title}
      </p>
      <button
        onClick={handleDelete}
        className="ml-auto block sm:hidden sm:group-hover:block cursor-pointer"
      >
        <img className="w-3 h-3" src="/icon-cross.svg" alt="cross" />
      </button>
    </div>
  );
};
