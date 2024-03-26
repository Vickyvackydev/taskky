"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "../../../firebase/firebase.config";
import { FaCheck, FaCheckSquare, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "@/components/modal";
import { collection, doc, setDoc } from "firebase/firestore";
import { useMediaQuery } from "@/hooks";

const Signup = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logging, setLogging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [noPassword, setNoPassword] = useState(false);
  const [check, setCheck] = useState<boolean | string>(false);
  const [modal, setModal] = useState(false);
  const userCollectionRef = collection(db, "usernames");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setLogging(true);

    if (password === confirmPassword && userName !== "" && checked) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;
        await sendEmailVerification(user);
        if (user) {
          setLogging(false);
          setEmail("");
          setPassword("");

          setConfirmPassword("");
          setUserName("");
          setChecked(false);
          setCheck(false);
          setNoPassword(false);
          setErrorMessage("");

          await setDoc(doc(userCollectionRef, auth?.currentUser?.uid), {
            name: userName,
            userId: auth?.currentUser?.uid,
          });
        }

        // router.push("/login");
        setModal(true);
      } catch (error: any) {
        setErrorMessage("email already exist");
      } finally {
        setLogging(false);
      }
    } else if (password !== confirmPassword) {
      setNoPassword(true);
      setLogging(false);
    } else if (userName === "") {
      setNoUser(true);
      setLogging(false);
    } else if (!checked) {
      setCheck(true);

      setLogging(false);
    } else if (userName === "") {
      setNoUser(true);
    }
  };

  const handleSignInWithGoogle = async () => {
    // authentication for google auth
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);

      if (userCredentials) {
        router.push("/Dashboard");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-around items-center lg:px-0 px-5">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
        className="lg:block hidden text-6xl font-medium"
      >
        <span className="text-text_gray">Sign up to</span> <br />{" "}
        <span className="text-green-400">Get Started</span>
        <span className="text-green-400">
          <FaCheckSquare />
        </span>
      </motion.div>
      <main className="flex justify-center items-center rounded-2xl lg:px-10 px-3 lg:pl-10 pl-4 bg-backgrd max-w-[550px] max-h-[900px] overflow-y-scroll pb-6">
        <div className="mt-7">
          <div className={``}>
            <span className="lg:text-3xl text-xl text-center">
              Get started by{" "}
              <span className="text-green-400">{"creating an account"}</span>
            </span>
            <p className="text-start mt-3 lg:text-lg text-sm">
              Create an account to manage and view your tasks.
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-7 relative">
            <div className="">
              <label htmlFor="" className="text-gray-500">
                Username
              </label>
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 1 }}
                type="text"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
                placeholder="e.g Josh Sam"
                className="w-full  h-12 outline-none pl-3 rounded-xl shadow-sm dark:bg-transparent"
              />
              {noUser && (
                <span className="text-red-400">please add a username</span>
              )}
            </div>
            <div>
              <label htmlFor="" className="text-gray-500">
                Email
              </label>
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 1 }}
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="josh@gmail.com"
                className="w-full  h-12 outline-none pl-3 rounded-xl shadow-sm dark:bg-transparent"
              />
              <span className="text-red-400">{errorMessage}</span>
            </div>
            <div>
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 1 }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="e.g 1234"
                className="w-full  h-12 outline-none pl-3 rounded-xl shadow-sm dark:bg-transparent"
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
            <div>
              <label htmlFor="password" className="text-gray-500">
                Confirm password
              </label>
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 1 }}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="e.g 1234"
                className="w-full  h-12 outline-none pl-3 rounded-xl shadow-sm dark:bg-transparent"
              />
              {showConfirmPassword ? (
                <span
                  className="absolute right-6 text-2xl mt-3 cursor-pointer text-gray-300"
                  onClick={() => setShowConfirmPassword(false)}
                >
                  <FaEyeSlash />
                </span>
              ) : (
                <span
                  className="absolute right-6 text-2xl mt-3 cursor-pointer text-gray-300"
                  onClick={() => setShowConfirmPassword(true)}
                >
                  <FaEye />
                </span>
              )}
              {noPassword && (
                <span className="text-red-400">password is not the same</span>
              )}
            </div>

            <div className="flex gap-3 items-center">
              <div
                className={`flex justify-center items-center cursor-pointer ${
                  check ? "border-red-400" : ""
                } border w-7 h-7 lg:rounded-lg rounded-xl ${
                  checked ? "bg-green-500" : ""
                }`}
                onClick={() => setChecked((prev) => !prev)}
              >
                {checked ? (
                  <span className="text-white">
                    <FaCheck />
                  </span>
                ) : null}
              </div>
              <span className="lg:text-lg text-sm text-gray-500">
                I agree to the terms and conditions applied
              </span>
            </div>
            <div className="flex flex-col gap-3 ">
              <Button
                text={"Create account"}
                loadingText="creating"
                textStyles="text-white"
                loaderColor="#fff"
                loadingTextColor="text-white"
                btnStyles="bg-green-500 w-full flex justify-center py-2 rounded-lg"
                handleClick={handleRegister}
                loading={logging}
              />
              <span className="flex justify-center items-center">Or</span>
              <Button
                text={"Sign in with google"}
                loadingText="signing in"
                textStyles="text-text_gray"
                btnStyles=" w-full flex justify-center items-center rounded-lg border-border_color border"
                handleClick={handleSignInWithGoogle}
                loading={logging}
                showImg={true}
                image="/g_icon.png"
              />
            </div>
            <span className="lg:text-lg text-sm">
              Already have an account?
              <Link href={"/login"} className="underline text-green-400">
                Login here
              </Link>
            </span>
            <div className="max-w-sm justify-center items-center flex">
              <span className="lg:text-lg text-sm">
                By creating an account your agree to our
                <span className="text-green-500"> {"Terms of Service"} </span>
                and <span className="text-green-500"> {"Privacy Policy"}</span>
              </span>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modal}
          isClose={() => setModal(false)}
          closeBtnColor="border border-border_color text-green-400"
          maxWidth="w-[450px]"
        >
          <div className="flex flex-col justify-center items-center text-xl text-center">
            <div>
              <Image src="/mail_giffy.gif" width={200} height={200} alt="gif" />
            </div>
            <span>
              We've sent you your email verification, <br />
              please verify your
            </span>
            <span className="text-green-400 font-medium">email address</span>

            <Button
              text="Ok, got it"
              textStyles="text-text_gray text-lg"
              btnStyles=" rounded-lg px-3 py-2"
              // handleClick={() => router.push("/login")}

              handleClick={() => setModal(false)}
            />
          </div>
        </Modal>
      </main>
    </section>
  );
};

export default Signup;

export const TopBar = () => {
  // topbar for the login and sign up layout
  const router = useRouter();
  const pathname = usePathname();
  const isMobileScreen = useMediaQuery("(max-width: 640px)");
  return (
    <div className=" h-[7rem]">
      <div className="fixed top-0 flex w-full justify-between items-center pb-3 px-5 pt-5 shadow-sm bg-white z-30">
        <Link href="/">
          <Image
            src="/logo.png"
            width={isMobileScreen ? 70 : 150}
            height={150}
            alt="logo image"
          />
        </Link>

        {pathname.includes("/login") ? (
          <Button
            text="Sign up"
            textStyles="text-white"
            btnStyles="bg-green-500 rounded-lg px-3 py-2"
            handleClick={() => router.push("/signup")}
          />
        ) : (
          <Button
            text="Login"
            textStyles="text-white"
            btnStyles="bg-green-500 rounded-lg px-3 py-2"
            handleClick={() => router.push("/login")}
          />
        )}
      </div>
    </div>
  );
};
