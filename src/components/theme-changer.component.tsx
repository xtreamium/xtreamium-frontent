import React from "react";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";
import { Icons } from "./icons";

const ThemeChanger = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];
  const [isOpened, setIsOpened] = React.useState(false);
  const themeMenu = React.useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const handleDropdown = () => {
    if (document.activeElement instanceof HTMLElement && isOpened) {
      document.activeElement.blur();
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };
  const changeTheme = (theme: string) => {
    if (mounted && themeMenu.current) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        setIsOpened(false);
      }
      setTheme(theme);
    }
  };
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div
      title="Change Theme"
      ref={themeMenu}
      className="dropdown dropdown-end "
    >
      <div
        tabIndex={0}
        onClick={handleDropdown}
        className="gap-1 normal-case btn btn-ghost"
      >
        <Icons.colorSwatch className="w-5 h-5" />
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-5 h-5 stroke-current md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>{" "}
        <span className="hidden font-normal md:inline">Theme</span>{" "}
        <svg
          width="12px"
          height="12px"
          className="hidden w-2 h-2 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
        <span className="hidden lg:inline_notreally">Theme</span>
      </div>
      <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16 z-50">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {themes.map((theme) => (
            <div
              onClick={() => changeTheme(theme)}
              key={theme}
              className="overflow-hidden rounded-lg outline-base-content outline outline-2 outline-offset-2"
            >
              <div
                data-theme={theme}
                className="w-full font-sans cursor-pointer bg-base-100 text-base-content"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="flex col-span-5 row-span-3 row-start-1 gap-1 px-4 py-3">
                    <div className="flex-grow text-sm font-bold">{theme}</div>
                    <div className="flex flex-wrap flex-shrink-0 gap-1">
                      <div className="w-2 rounded bg-primary" />
                      <div className="w-2 rounded bg-secondary" />
                      <div className="w-2 rounded bg-accent" />
                      <div className="w-2 rounded bg-neutral" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
