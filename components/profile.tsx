import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
  FaBox,
  FaPlus,
  FaTrash,
  FaUpload,
  FaUser,
  FaUserNinja,
} from "react-icons/fa";
import { auth, db } from "@/firebase/firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useFetchFirestoreData } from "@/hooks";
import Modal from "./modal";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  google_image: string | any;
  userName: string | any;
  userEmail: string | any;
  handleUploadImage: () => void;
  uploadedImage: any;
  uploadModal: boolean;
  closeUploadModal: () => void;
  uploading: boolean;
  handleImageChange: (e: any) => void;
  setModalOpen: () => void;
  previewImage: any;
  selectedImageName: string;
  removeimage: () => void;
}
const Profile = ({
  isOpen,
  google_image,
  userEmail,
  handleUploadImage,
  uploadModal,
  uploadedImage,
  uploading,
  closeUploadModal,
  handleImageChange,
  setModalOpen,
  selectedImageName,
  previewImage,
  removeimage,
}: Props) => {
  const [profession, setProfession] = useState("");
  const [input, setInput] = useState(false);
  const userProfessionRef = collection(db, "profession");
  const { data: userProfession } = useFetchFirestoreData("profession");
  const { data: user_authname } = useFetchFirestoreData("usernames");
  // const googleAuthName = auth?.currentUser?.displayName
  const [googleAuthName, setGoogleAuthName] = useState<any>("");

  const profile_name = user_authname.map((name: any) => name.name);

  const handleAddProfession = async () => {
    try {
      const currentUser = auth?.currentUser;

      if (currentUser) {
        const professionRef = doc(userProfessionRef, currentUser.uid);
        await setDoc(professionRef, {
          profession: profession,
          userId: currentUser.uid,
        });
        setInput(false);
      } else {
        console.log("no user profession yet");
      }
    } catch (error) {
      console.log("error fetching user profession data", error);
    }
  };

  const userProfessionName = userProfession.map(
    (userProf: any) => userProf.profession
  );

  useEffect(() => {
    if (auth?.currentUser) {
      setGoogleAuthName(auth?.currentUser?.displayName);
    } else {
      console.log("loading");
    }
  }, [auth?.currentUser]);

  // console.log(userProfessionName);
  // console.log(googleAuthName);

  return (
    <Transition
      as={"div"}
      className={`absolute lg:flex hidden bg-white shadow-md rounded-lg w-[20vw] h-[70vh] right-3 top-[7rem] justify-center items-center`}
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center z-10 mt-5 max-w-full">
          {google_image || uploadedImage ? (
            <Image
              src={google_image || uploadedImage}
              width={100}
              height={100}
              alt="profile image"
              className={`rounded-full ${google_image ? "w-50%" : ""}`}
            />
          ) : (
            <Image
              src={"/profile.jpg"}
              width={100}
              height={100}
              alt="profile image"
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col items-start py-5 gap-4">
          <div className="flex flex-col gap-2 border-b border-border_color w-full">
            <label htmlFor="text" className="text-text_gray">
              Name
            </label>
            <div className="flex gap-2 items-center">
              <FaUserNinja className="text-gray-300" />
              {googleAuthName ? (
                <span className="text-gray-300">{googleAuthName}</span>
              ) : (
                <span>{profile_name}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b border-border_color w-full">
            <label htmlFor="text " className="text-text_gray">
              Email
            </label>
            <div className="flex gap-2 items-center">
              <FaUser className="text-gray-300" />
              <span className="text-gray-300">{userEmail ?? null}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b border-border_color w-full">
            <label htmlFor="text " className="text-text_gray">
              Profession
            </label>
            <div className="flex gap-2 items-center justify-between">
              <FaBox className="text-gray-300" />
              {input ? (
                <input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfession(e.target.value)
                  }
                  className="outline-none w-full ml-3 "
                />
              ) : (
                <span className="text-gray-300">
                  {userProfessionName ?? "add profession"}
                </span>
              )}
              {input ? (
                <button onClick={handleAddProfession}>
                  <FaUpload className={"text-purple-300"} />
                </button>
              ) : (
                <button onClick={() => setInput(true)}>
                  <FaPlus className={"text-purple-300"} />
                </button>
              )}
            </div>
          </div>

          <div
            className={` ${google_image ? "tooltip tooltip-bottom" : ""}`}
            data-tip="can't upload google image"
          >
            <Button
              text={`${uploading ? "uploading..." : "upload image"}`}
              icon={<FaUpload />}
              btnStyles={`justify-center w-full border border-border_color py-2 rounded-xl mt-[2rem] `}
              textStyles="text-purple-400"
              iconStyles="text-purple-400 pt-[1.8px]"
              disabled={google_image || uploading}
              handleClick={setModalOpen}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={uploadModal}
        isClose={closeUploadModal}
        closeBtnColor=""
        maxWidth="w-[350px]"
      >
        <div>
          {previewImage ? (
            <div className="flex gap-3 items-center">
              <Image
                src={previewImage}
                width={100}
                height={100}
                alt="preview image"
              />
              <span>{selectedImageName}</span>
              <button onClick={removeimage} className="text-red-400">
                <FaTrash />
              </button>
            </div>
          ) : (
            <input
              type="file"
              className="file-input w-full max-w-xs"
              onChange={handleImageChange}
            />
          )}

          <Button
            text={`${uploading ? "" : "upload now"}`}
            loading={uploading}
            loadingText="please wait..."
            loadingTextColor="text-purple-400"
            loaderColor={"#A695C7"}
            icon={<FaUpload />}
            btnStyles={`justify-center w-full border border-border_color py-2 rounded-xl mt-[2rem]`}
            textStyles="text-purple-400"
            iconStyles="text-purple-400 pt-[1.8px]"
            handleClick={handleUploadImage}
          />
        </div>
      </Modal>
    </Transition>
  );
};

export default Profile;
