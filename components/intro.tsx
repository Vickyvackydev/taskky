import Image from "next/image";
import React from "react";

const Intro = () => {
  return (
    <main className="flex justify-evenly px-24 my-24">
      <div className="w-[500px] h-full justify-center items-start flex flex-col border rounded-lg p-5">
        <span className="text-3xl text-green-500 font-semibold">
          What We Do
        </span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          eligendi possimus quod consectetur dolorem ipsa doloribus expedita
          facilis porro numquam eius sint fugit, adipisci soluta quae quasi,
          mollitia nihil minima? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Maiores eligendi possimus quod consectetur dolorem
          ipsa doloribus expedita facilis porro numquam eius sint fugit,
          adipisci soluta quae quasi, mollitia nihil minima? Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Maiores eligendi possimus quod
          consectetur dolorem ipsa doloribus expedita facilis porro numquam eius
          sint fugit, adipisci soluta quae quasi, mollitia nihil minima?
        </p>
      </div>
      <div>
        <Image src="/ui_1.jpg" width={500} height={500} alt="image" />
      </div>
    </main>
  );
};

export default Intro;
