import React from "react";
export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return <input type={props.type} ref={ref} className="w-full max-w-xs input" />;
});

export default Input;
