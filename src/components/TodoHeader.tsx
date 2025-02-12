import { ThemeType } from "../types/todo";

interface TodoHeader {
  currentTheme: ThemeType;
  onToggleTheme: () => void;
}

export const TodoHeader = ({ currentTheme, onToggleTheme }: TodoHeader) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-neutral-light-very-light-gray font-semibold text-2xl tracking-widest">
        TODO
      </h1>
      <button onClick={onToggleTheme}>
        {currentTheme === "dark" && (
          <img className="w-5 h-5" src="/icon-sun.svg" alt="sun" />
        )}
        {currentTheme === "light" && (
          <img className="w-5 h-5" src="/icon-moon.svg" alt="moon" />
        )}
      </button>
    </div>
  );
};
