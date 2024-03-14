import { useScroll } from "@/hooks";
import { Transition } from "@headlessui/react";
import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollBtn = () => {
  const ScrollToTop: boolean = useScroll(); // useScroll hooks mounted when triggered

  const handleScrollBackToTop = (elem: string) => {
    const component = document.getElementById(elem);

    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Transition
      as={"div"}
      show={ScrollToTop}
      enter="transition-all ease-in duration-500"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition-all ease-out duration-500"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      className="fixed bottom-9 lg:right-4 right-9 z-50 lg:w-[4rem] lg:h-[4rem] w-12 h-12  flex justify-center items-center rounded-full bg-green-400 lg:text-3xl text-2xl text-white cursor-pointer hover:scale-100 transition-all duration-200"
    >
      {/* scroll user back to top */}
      <span onClick={() => handleScrollBackToTop("navbar")}>
        <FaArrowAltCircleUp />
      </span>
    </Transition>
  );
};

export default ScrollBtn;
// end..
