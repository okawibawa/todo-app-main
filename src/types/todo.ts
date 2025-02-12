export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";
export type ThemeType = "dark" | "light";

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}
