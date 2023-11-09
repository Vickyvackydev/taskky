import React from "react";

interface Props {
  text: string;
  btnStyles?: string;
  textStyles?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  iconStyles?: string;
  onclick?: () => void;
  disabled?: boolean;
}
const Button = ({
  text,
  btnStyles,
  textStyles,
  handleClick,
  icon,
  iconStyles,
  disabled,
}: Props) => {
  return (
    <button
      type="button"
      className={`flex gap-1 ${btnStyles} px-3 hover:scale-90 transition-all`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={iconStyles}>{icon}</span>
      <span className={textStyles}>{text}</span>
    </button>
  );
};

export default Button;
