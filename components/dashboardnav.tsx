"use client";
import { useAuth } from "@/context/AuthContext";
import { A_ICON } from "@/public";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaArrowCircleDown,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaBell,
  FaBook,
  FaCommentDots,
  FaListUl,
  FaPencilAlt,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import UploadDetailsPop from "./uploadDetailsPop";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase.config";

const navlinks = [
  {
    link: "My Task",
    href: "",
  },
  {
    link: "Planning",
    href: "",
  },
  {
    link: "Activities",
    href: "",
  },
];

type navBarType = {
  isOpen: () => void;
  onClose: () => void;
  Open: () => void;
  Close: () => void;
  mobileView: boolean;
  isVisible: boolean;
  isRightSide: boolean;
};
const Dashboardnav = ({
  onClose,
  isOpen,
  Close,
  Open,
  isRightSide,
  mobileView,
  isVisible,
}: navBarType) => {
  // const { fullName } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState<any>([]);

  const imageListRef = ref(storage, "imagess/");
  const uploadImage = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload}`);

    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      // console.log(response);

      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getCurrentTime());
  }, []);
  // const userName = localStorage.getItem("userName");
  const maainName = () => {
    if (localStorage !== undefined) {
      const userName = localStorage.getItem("userName");
      return userName;
    }
  };

  return (
    <nav className="border-b-2 lg:w-[85vw] w-full lg:p-5 lg:fixed relative bg-white z-30 shadow-sm lg:left-[14.4rem] left-0 lg:block flex p-5">
      {mobileView && (
        <div onClick={() => isOpen()}>
          <span className="cursor-pointer">
            <FaBars />
          </span>
        </div>
      )}
      <div className="flex justify-between items-center ">
        <span className="pl-4 pr-[5rem]">
          {greeting} {`${maainName()?.split(" ")[0]}`}
        </span>
        <div className="border-2 border-border_color px-6 rounded-3xl w-[30rem] ml-[4rem] lg:flex hidden">
          <span className="pt-[0.9rem] text-orange-400 lg:block hidden">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder={`Search task name`}
            className="py-3 outline-none px-3 placeholder:text-lg bg-transparent placeholder:text-gray-300 lg:block hidden "
          />
        </div>
        <div
          className="lg:block hidden  ml-[10rem] border-2 rounded-2xl p-1 cursor-pointer"
          onClick={() => setUploadPopUp((prev) => !prev)}
        >
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image src={A_ICON} width={50} height={50} alt="profile" />
              <div className="flex flex-col">
                <span>Obioma Victor</span>
                <span>Software Engineer</span>
              </div>

              <div className="pt-6">
                <Image
                  src="/arrow_down.svg"
                  width={10}
                  height={10}
                  alt="arrow down"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden  flex gap-4 flex-auto">
          <div>
            <span>
              <FaUser />
            </span>
          </div>
          <div className="cursor-pointer">
            <span onClick={() => Open()}>
              <FaListUl />
            </span>
          </div>
        </div>
      </div>
      <UploadDetailsPop isOpen={uploadPopUp} isClose={() => {}} />
    </nav>
  );
};

export default Dashboardnav;
