import { useQuery } from "@tanstack/react-query";
import { todosApi } from "../api/todo";
import { FilterType } from "../types/todo";
import { useMemo } from "react";

export const useFilteredTodosQuery = (filter: FilterType) => {
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getTodos,
    staleTime: 1000 * 60 * 5,
  });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;

      return true;
    });
  }, [todos, filter]);

  return {
    todos: filteredTodos,
    isLoading,
    error,
  };
};
