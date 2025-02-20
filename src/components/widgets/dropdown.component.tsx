import React, { useEffect, useContext, useRef } from "react";
import classNames from "classnames";
import FocusLock from "react-focus-lock";
import { defaultTheme } from "@/constants";
import Button, { ButtonProps } from "./button.component";
import Transition from "./transition.component";

export interface DropdownProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Function executed when the dropdown is closed
   */
  onClose: () => void;
  /**
   * Defines if the dropdown is open
   */
  isOpen: boolean;
  /**
   * Defines the alignement of the dropdown related to its parent
   */
  align?: "left" | "right";
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(props, ref) {
    const {
      children,
      onClose,
      isOpen,
      className,
      align = "left",
      ...other
    } = props;
    const { dropdown } = defaultTheme;
    const baseStyle = dropdown.base;
    const alignStyle = dropdown.align[align];

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Esc" || e.key === "Escape") {
        onClose();
      }
    }

    const dropdownRef = useRef<HTMLUListElement>(null);
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, { capture: true });
      document.addEventListener("keydown", handleEsc, { capture: true });
      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEsc);
      };
    }, [isOpen]);

    const cls = classNames(baseStyle, alignStyle, className);

    return (
      <Transition
        show={isOpen}
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div ref={ref}>
          <FocusLock returnFocus>
            <ul
              className={cls}
              ref={dropdownRef}
              aria-label="submenu"
              {...other}
            >
              {children}
            </ul>
          </FocusLock>
        </div>
      </Transition>
    );
  }
);

type Ref = typeof Button;
const DropdownItem = React.forwardRef<Ref, ButtonProps>(function DropdownItem(
  props,
  ref
) {
  // Note: className is passed to the inner Button
  const { children, ...other } = props;

  const { dropdownItem } = defaultTheme;
  const baseStyle = dropdownItem.base;

  return (
    <li className={baseStyle}>
      <Button layout="__dropdownItem" ref={ref} {...other}>
        {children}
      </Button>
    </li>
  );
});

export { Dropdown, DropdownItem };
