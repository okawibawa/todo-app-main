import axios from "axios";
import { Todo, CreateTodoInput, UpdateTodoInput } from "../types/todo";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3001",
});

export const todosApi = {
  getTodos: async (): Promise<Todo[]> => {
    const finalUrl = "/todos";

    // Server-side filtering
    // const params = new URLSearchParams();

    // if (filter !== "all") {
    //   params.append("status", filter);
    // }

    // if (Array.from(params).length > 0) {
    //   finalUrl += "?" + params.toString();
    // }

    const { data } = await api.get(finalUrl);

    return data;
  },

  createTodo: async (input: CreateTodoInput): Promise<Todo> => {
    const { data } = await api.post("/todos", input);

    return data;
  },

  updateTodo: async (id: number, payload: UpdateTodoInput) => {
    const { data } = await api.patch(`/todos/${id}`, payload);

    return data;
  },

  deleteTodo: async (id: number) => {
    const { data } = await api.delete(`/todos/${id}`);

    return data;
  },

  deleteCompletedTodos: async () => {
    const { data } = await api.delete("/todos/completed");

    return data;
  },

  reorderTodos: async (todos: Todo[]): Promise<Todo[]> => {
    const { data } = await api.post("/todos/reorder", { todos });

    return data;
  },
};
