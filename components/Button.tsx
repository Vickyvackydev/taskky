import React from "react";

interface Props {
  text: string;
  btnStyles?: string;
  textStyles?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  iconStyles?: string;
  loadingText?: string;
  disabled?: boolean;
  loading?: boolean;
}
const Button = ({
  text,
  btnStyles,
  textStyles,
  handleClick,
  icon,
  iconStyles,
  loading,
  loadingText,
}: Props) => {
  return (
    <div>
      {loading ? (
        <button
          type="button"
          className={`flex gap-1 ${btnStyles} px-3 hover:scale-90 transition-all`}
        >
          <>
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="#fff"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="#fff"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-white">{loadingText}...</span>
          </>
        </button>
      ) : (
        <button
          type="button"
          className={`flex gap-1 ${btnStyles} px-3 hover:scale-90 transition-all`}
          onClick={handleClick}
        >
          <span className={iconStyles}>{icon}</span>
          <span className={textStyles}>{text}</span>
        </button>
      )}
    </div>
  );
};

export default Button;
