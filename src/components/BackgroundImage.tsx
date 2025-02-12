import { ThemeType } from "../types/todo";

interface BackgroundImage {
  theme: ThemeType;
}

export const BackgroundImage = ({ theme }: BackgroundImage) => {
  return (
    <>
      {theme === "dark" ? (
        <>
          <img
            src="/bg-mobile-dark.jpg"
            alt="background mobile dark"
            className="absolute top-0 left-0 w-full z-0 md:hidden"
          />

          <img
            src="/bg-desktop-dark.jpg"
            alt="background desktop dark"
            className="hidden absolute top-0 left-0 w-full z-0 md:block max-h-[300px]"
          />
        </>
      ) : (
        <>
          <img
            src="/bg-mobile-light.jpg"
            alt="background mobile light"
            className="absolute top-0 left-0 w-full z-0 md:hidden"
          />

          <img
            src="/bg-desktop-light.jpg"
            alt="background desktop light"
            className="hidden absolute top-0 left-0 w-full z-0 md:block max-h-[300px]"
          />
        </>
      )}
    </>
  );
};
