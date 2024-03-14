import React from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

interface Props {
  // state the page header params types
  text: string;
  button: boolean;
  setState: any;
  btnText: string;
  textStyle?: string;
  style?: string;
  btnStyle: string;
  btnTextStyle: string;
  btnIconStyle: string;
  pathname?: any;
}

// The page header component reusable in all dashboard to do component
const PageHeader = ({
  text,
  button,
  setState,
  btnText,
  textStyle,
  style,
  btnStyle,
  btnTextStyle,
  btnIconStyle,
  pathname,
}: Props) => {
  return (
    <div className={`flex justify-between pt-6 ${style} `}>
      <span className={textStyle}>{text}</span>

      {button === true ? (
        <Button
          text={btnText}
          textStyles={btnTextStyle}
          btnStyles={` ${btnStyle} rounded-3xl  py-3`}
          icon={<FaPlus />}
          iconStyles={`pt-[0.125rem] ${btnIconStyle}`}
          handleClick={() => setState(true)}
        />
      ) : button === false ? (
        // displays if the button is set not to display
        <div>
          <Link href={pathname} className={btnTextStyle}>
            View all
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PageHeader;
// end..
