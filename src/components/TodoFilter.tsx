import { FilterType } from "../types/todo";

interface TodoFilter {
  filter: FilterType;
  onFilter: (filter: FilterType) => void;
  className?: string;
}

export const TodoFilter = ({
  filter,
  onFilter,
  className = "",
}: TodoFilter) => {
  return (
    <div className={className}>
      <button
        onClick={() => onFilter("all")}
        className={`font-semibold ${filter === "all" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
      >
        All
      </button>
      <button
        onClick={() => onFilter("active")}
        className={`font-semibold ${filter === "active" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
      >
        Active
      </button>
      <button
        onClick={() => onFilter("completed")}
        className={`font-semibold ${filter === "completed" ? "text-primary-bright-blue" : "dark:text-neutral-dark-darker-grayish-blue text-neutral-light-dark-grayish-blue"} text-[16px]`}
      >
        Completed
      </button>
    </div>
  );
};
