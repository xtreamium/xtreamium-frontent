import React from "react";
import classNames from "classnames";
import { defaultTheme } from "@/constants";

export interface HelperTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Defines the color of the helper text (the same as with Input, Select, etc.)
   */
  valid?: boolean;
}

const HelperText = React.forwardRef<HTMLSpanElement, HelperTextProps>(
  function HelperText(props, ref) {
    const { children, valid, className, ...other } = props;
    const { helperText } = defaultTheme;
    const baseStyle = helperText.base;
    const validStyle = helperText.valid;
    const invalidStyle = helperText.invalid;

    const validationStyle = (valid: boolean | undefined): string => {
      switch (valid) {
        case true:
          return validStyle;
        case false:
          return invalidStyle;
        default:
          return "";
      }
    };

    const cls = classNames(baseStyle, validationStyle(valid), className);

    return (
      <span className={cls} ref={ref} {...other}>
        {children}
      </span>
    );
  }
);

export default HelperText;
