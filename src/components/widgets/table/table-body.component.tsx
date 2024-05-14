import React from "react";
import classNames from "classnames";
import { defaultTheme } from "@/constants";

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, Props>(
  function TableBody(props, ref) {
    const { className, children, ...other } = props;

    const { tableBody } = defaultTheme;
    const baseStyle = tableBody.base;

    const cls = classNames(baseStyle, className);

    return (
      <tbody className={cls} ref={ref} {...other}>
        {children}
      </tbody>
    );
  }
);

export default TableBody;
