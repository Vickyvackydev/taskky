"use client";
import Button from "@/components/Button";

import { auth } from "@/firebase/firebase.config";
import { useFetchFirestoreData } from "@/hooks";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaInfo,
  FaKey,
  FaUser,
  FaUserNinja,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PreloaderModal from "@/components/preloadermodal";

const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [wrongDetailsPopUp, setWrongDetailsPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [preloader, setPreloader] = useState(false);

  const { data: auth_userName } = useFetchFirestoreData("usernames");

  const displayUserName = auth_userName.map((name: any) => name.name);

  const handleLogin = async () => {
    setLoading(true);

    if (displayUserName) {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;

        if (user) {
          router.push("/Dashboard");
          setWrongDetailsPopUp(false);
          setErrorMessage("");
          setEmail("");
          setPassword("");
          setPreloader(true);
        }
      } catch (error) {
        console.log("this user does not exist");
        setErrorMessage("Email does not exist or password is incorrect");
        setWrongDetailsPopUp(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else if (userName !== displayUserName) {
      console.log("user name does not exist");
      // setNoUser(true);
      setErrorMessage("Username does not exist");
      setWrongDetailsPopUp(true);
      setLoading(false);
    } else if (userName !== "") {
      console.log("no user name");
      // setNoUser(true);
      setErrorMessage("Username is required");
      setWrongDetailsPopUp(true);
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-around items-center">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="lg:flex hidden font-medium mt-8 flex-col items-start"
      >
        <span className="text-green-400 text-6xl">Welcome Back 👋 </span>
        <span className="ml-2">Kindly Login To your Dashbaord.</span>
      </motion.div>
      <motion.main
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="flex justify-center items-center bg-backgrd w-fit h-full rounded-xl  px-5 pb-4"
      >
        <div className="mt-7">
          <span className="text-3xl flex justify-center font-medium text-green-400">
            Login
          </span>
          <p className="text-center mt-3 text-gray-500">
            Kindly login to continue
          </p>
          {wrongDetailsPopUp && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col gap-4 mt-7 relative">
            <label htmlFor="" className="text-gray-500">
              Username
            </label>
            <div className="flex items-center lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3 bg-white">
              <span className="text-gray-400">
                <FaUserNinja />
              </span>
              <input
                type="text"
                value={displayUserName || userName}
                className="outline-none ml-3 border-l pl-3"
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
            <label htmlFor="" className="text-gray-500">
              Email
            </label>
            <div className="flex items-center lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3 bg-white">
              <span className="text-gray-400">
                <FaUser />
              </span>
              <input
                type="email"
                className="border-l outline-none ml-3 pl-3 w-full"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <div className="flex items-center lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3 bg-white">
              <span className="text-gray-400">
                <FaKey />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="ml-3 border-l outline-none pl-3"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              {showPassword ? (
                <span
                  className="absolute right-6 text-2xl mt-1 cursor-pointer text-gray-300"
                  onClick={() => setShowPassword(false)}
                >
                  <FaEyeSlash />
                </span>
              ) : (
                <span
                  className="absolute right-6 text-2xl mt-1 cursor-pointer text-gray-300"
                  onClick={() => setShowPassword(true)}
                >
                  <FaEye />
                </span>
              )}
            </div>

            <Button
              text="Login"
              loadingText="logging in"
              loadingTextColor="text-white"
              loaderColor="#fff"
              textStyles="text-white"
              btnStyles="bg-green-500 w-full flex justify-center py-2 rounded-lg"
              handleClick={handleLogin}
              loading={loading}
            />
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link href={"/signup"} className="underline text-green-400">
                sign up
              </Link>
            </span>
            <Link href="/forgotpassword" className="underline text-green-400">
              Forgot password?
            </Link>
          </div>
        </div>
        <PreloaderModal
          isOpen={preloader}
          isClose={() => setPreloader(false)}
          loaderColor="text-accent"
          loadertext="please wait..."
        />
      </motion.main>
    </section>
  );
};

export default Login;
