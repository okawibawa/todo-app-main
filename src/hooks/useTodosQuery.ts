import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "../api/todo";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types/todo";
import { useSocketActions } from "./useSocketActions";

export const useTodosQuery = () => {
  const queryClient = useQueryClient();
  const { isConnected, sendMessage } = useSocketActions()

  const createTodo = useMutation({
    mutationFn: (input: CreateTodoInput) => todosApi.createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      if (isConnected) {
        sendMessage('ADD_TODO', {})
      }
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateTodoInput }) =>
      todosApi.updateTodo(id, payload),
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

  const deleteCompletedTodos = useMutation({
    mutationFn: () => todosApi.deleteCompletedTodos(),
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
    createTodo,
    updateTodo,
    deleteTodo,
    deleteCompletedTodos,
    reorderTodos,
  };
};
