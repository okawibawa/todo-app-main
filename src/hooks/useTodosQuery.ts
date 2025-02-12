import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { todosApi } from "../api/todo";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types/todo";
import { Update } from "vite/types/hmrPayload.js";

export const useTodosQuery = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getTodos,
  });

  const createTodo = useMutation({
    mutationFn: (input: CreateTodoInput) => todosApi.createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTodoInput }) =>
      todosApi.updateTodo(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id: number) => todosApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const reorderTodos = useMutation({
    mutationFn: (todos: Todo[]) => todosApi.reorderTodos(todos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
  };
};
