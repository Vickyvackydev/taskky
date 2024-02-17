"use client";
import Button from "@/components/Button";
import Modal from "@/components/modal";

import { auth, db } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaInfo } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  // const { showUserName } = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [wrongDetailsModal, setWrongDetailsModal] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (userName !== "") {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // showUserName(email);

        const user = userCredentials.user;

        localStorage.setItem("userName", userName);

        if (user) {
          router.push("/Dashboard");
        }
      } catch (error) {
        console.log("this user does not exist");
        setWrongDetailsModal(true);
        setLoading(false);
      }
    } else {
      console.log("no user name");
      setNoUser(true);
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className="mt-7">
        <span className="text-3xl flex justify-center ">Login</span>
        <p className="text-center mt-3">Kindly login to continue</p>
        <div className="flex flex-col gap-4 mt-7 relative">
          <div className="flex flex-col">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="lg:w-[25rem] w-full border h-12 outline-none pl-3"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
            {noUser && (
              <div className="flex gap-1">
                <span className="bg-red-300 text-xs mt-[0.35rem]  flex justify-center items-center rounded-full w-3 h-3 text-white">
                  <FaInfo />
                </span>
                <span className="text-red-300">username required</span>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="w-full border h-12 outline-none pl-3"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border h-12  outline-none pl-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            {showPassword ? (
              <span
                className="absolute right-6 text-2xl mt-3 cursor-pointer text-gray-300"
                onClick={() => setShowPassword(false)}
              >
                <FaEyeSlash />
              </span>
            ) : (
              <span
                className="absolute right-6 text-2xl mt-3 cursor-pointer text-gray-300"
                onClick={() => setShowPassword(true)}
              >
                <FaEye />
              </span>
            )}
          </div>

          <Button
            text="Login"
            loadingText="logging in"
            textStyles="text-white"
            btnStyles="bg-green-500 w-full flex justify-center py-2 rounded-lg"
            handleClick={handleLogin}
            loading={loading}
          />
        </div>
      </div>
      <Modal
        isOpen={wrongDetailsModal}
        isClose={() => setWrongDetailsModal(false)}
      >
        <div className="text-red-400">
          <span>
            wrong details: <span>wrong email or password</span>
          </span>
        </div>
      </Modal>
    </main>
  );
};

export default Login;
