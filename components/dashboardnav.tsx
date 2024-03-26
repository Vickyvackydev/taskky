"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBars, FaListUl, FaSearch, FaUser } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/firebase/firebase.config";
import Profile from "./profile";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFetchFirestoreData } from "@/hooks";
import { useSearchQuery } from "@/context/searchContext";
import SmallScreenPopup from "./smallscreenpopup";
import { useTheme } from "next-themes";

type navBarType = {
  // state types of the navbar params
  isOpen: () => void;
  onClose: () => void;
  Open: () => void;
  Close: () => void;
  mobileView: boolean;
  isVisible: boolean;
  isRightSide: boolean;
};
const Dashboardnav = ({ isOpen, Open, mobileView }: navBarType) => {
  const { resolvedTheme } = useTheme();
  const { searchQuery, setSearchQuery, setShowTopContent } = useSearchQuery(); //coming from useSreachContext
  const [greeting, setGreeting] = useState("");
  const [uploadPopUp, setUploadPopUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | any>(null);
  const [UploadUrl, setUploadUrl] = useState<null | any>(null);
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>("");
  const [photoURL, setPhotoUrl] = useState<string | null>("");
  const [UserEmail, setUserEmail] = useState<string | null>("");
  const imagesCollectionRef = collection(db, "images");
  const { data: user_authname, loading } = useFetchFirestoreData("usernames"); // fetch usersnames from firestore
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [mobilePopUp, setMobilePopUp] = useState(false);
  const { data: userProfession } = useFetchFirestoreData("profession"); // fetch users profession from firestore

  const userName = user_authname.map((name: any) => name.name.split(" ")[0]); // get the user name
  const userProfessionName = userProfession.map(
    // get the user profession
    (userProf: any) => userProf.profession
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle the search
    setSearchQuery(e.target.value);

    if (e.target.value.trim() !== "") {
      setShowTopContent(false);
    } else {
      setShowTopContent(true);
    }
  };
  useEffect(() => {
    // Retrieve uploadedURL from local storage when component mounts
    const storedURL = localStorage.getItem("uploadedURL");
    if (storedURL) {
      setUploadUrl(storedURL);
    }
  }, []);

  useEffect(() => {
    // Save uploadedURL to local storage whenever it changes
    if (UploadUrl) {
      localStorage.setItem("uploadedURL", UploadUrl);
    }
  }, [UploadUrl]);

  const handleImageChange = (e: any) => {
    // onchange for the image upload
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewImg(reader.result);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  useEffect(() => {
    // fetch users data from google auth
    if (auth?.currentUser) {
      setDisplayName(auth?.currentUser?.displayName);
      setPhotoUrl(auth?.currentUser?.photoURL);
      setUserEmail(auth?.currentUser?.email);
    } else {
      console.log("loading");
    }
  }, [auth?.currentUser]);

  useEffect(() => {
    // state tiem and hour to greet user
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

  const handleImageUpload = async () => {
    // upload imge to firestore for a particular user
    if (!selectedImage) return;
    setUploading(true);

    try {
      const currentUser = auth?.currentUser; // gets the particular authenticated

      if (!currentUser) return;
      const storageRef = ref(
        storage,
        `images/${currentUser?.uid}/${selectedImage.name}` // upload user image
      );

      await uploadBytes(storageRef, selectedImage);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(imagesCollectionRef, {
        imageURL: imageUrl,
        userId: currentUser?.uid,
        uploadedAt: serverTimestamp(), // Add timestamp when image was uploaded
      });

      setUploadUrl(imageUrl);
      setModal(false);
      setUploadPopUp(false);
      console.log("image uploaded", UploadUrl);
    } catch (error) {
      console.log("error uploading image", error);
    } finally {
      setUploading(false);
      setPreviewImg(null);
      setSelectedImage(null);
    }
  };

  return (
    <nav className="border-b-2 lg:w-[85vw] w-full lg:p-5 lg:fixed relative bg-white dark:bg-bg_black z-30 shadow-sm lg:left-[14.4rem] left-0 lg:block flex p-5 dark:border-gray-700">
      {mobileView && ( // shows bar to open the navbar when on mobile screen
        <div onClick={() => isOpen()}>
          <span className="cursor-pointer">
            <FaBars className="dark:text-gray-300" />
          </span>
        </div>
      )}
      <div className="flex justify-between items-center ">
        <span className="pl-4 pr-[5rem] dark:text-gray-300  lg:text-sm text-xs text-text_black font-medium">
          {greeting}{" "}
          {`${displayName ? displayName?.split(" ")[0] : userName} 😊`}
        </span>
        <div className="border-2 border-border_color dark:border-gray-700 px-6 rounded-3xl w-[30rem] ml-[4rem] lg:flex hidden py-4">
          <span className=" text-orange-400 lg:block hidden">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder={`Search task name`}
            value={searchQuery}
            onChange={handleChange}
            className=" outline-none px-3  bg-transparent placeholder:text-gray-300 lg:block hidden dark:text-gray-300 w-full text-xs placeholder:text-sm"
          />
        </div>
        <div
          className="lg:block hidden  ml-[10rem] p-1 cursor-pointer"
          onClick={() => setUploadPopUp((prev) => !prev)} // displays when on larger screen
        >
          <div className="flex justify-between ">
            <div className="flex gap-4 items-center">
              {photoURL || UploadUrl ? (
                <Image
                  src={photoURL || UploadUrl}
                  width={50}
                  height={50}
                  alt="profile"
                  className="border-2 border-border_color rounded-full dark:border-gray-700"
                />
              ) : (
                <Image
                  src={"/profile.jpg"}
                  width={50}
                  height={50}
                  alt="profile"
                  className="border-2 border-border_color rounded-full dark:border-green-300"
                />
              )}

              <div className="">
                <span className="dark:text-gray-300">My profile</span>
              </div>

              <div className="pt-0">
                {resolvedTheme === "dark" ? (
                  <div>
                    <Image
                      src="/white-down-arrow-png-2.png"
                      width={10}
                      height={10}
                      alt="arrow down"
                    />
                  </div>
                ) : (
                  <Image
                    src="/arrow_down.svg"
                    width={10}
                    height={10}
                    alt="arrow down"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden  flex gap-4 flex-auto items-center">
          <div onClick={() => setMobilePopUp((prev) => !prev)}>
            {photoURL || UploadUrl ? ( // hides on large screen displays on mobile screen
              <Image
                src={photoURL || UploadUrl}
                width={50}
                height={50}
                alt="profile"
                className="border-2 border-border_color rounded-full"
              />
            ) : (
              <Image
                src={"/profile.jpg"}
                width={50}
                height={50}
                alt="profile"
                className="border-2 border-border_color rounded-full"
              />
            )}
          </div>
          <div className="cursor-pointer">
            {/* opens the righthero component on mobile screen */}
            <span onClick={() => Open()}>
              <FaListUl className="dark:text-gray-300" />
            </span>
          </div>
        </div>
      </div>
      {/* displays popup for user details */}
      <Profile
        isOpen={uploadPopUp}
        isClose={() => {}}
        google_image={photoURL}
        userEmail={UserEmail}
        userName={displayName}
        handleUploadImage={handleImageUpload}
        uploadedImage={UploadUrl}
        uploadModal={modal}
        closeUploadModal={() => setModal(false)}
        uploading={uploading}
        handleImageChange={handleImageChange}
        setModalOpen={() => setModal(true)}
        previewImage={previewImg}
        selectedImageName={selectedImage?.name}
        removeimage={() => {
          setPreviewImg(null);
          setSelectedImage(null);
        }}
      />
      {/* display users details only on mobile screens */}
      <SmallScreenPopup
        openPopUp={mobilePopUp}
        userEmail={UserEmail || ""}
        userName={displayName || userName}
        userProfession={userProfessionName}
        profileimage={photoURL || UploadUrl}
      />
    </nav>
  );
};

export default Dashboardnav;

// end..
