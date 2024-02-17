"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";

import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  // const { showUserName } = useAuth();
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

  const handleRegister = async () => {
    setLogging(true);

    if (password === confirmPassword && userName !== "" && checked) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // showUserName(email);
        localStorage.setItem("userName", userName);
        const user = userCredentials.user;

        if (user) {
          // await setDoc(doc(db, "users", user.uid), { role });

          setLogging(false);
          setEmail("");
          setPassword("");

          setConfirmPassword("");
          setUserName("");
        }

        // Set user data in Firestore
        // await setDoc(doc(db, "users", user.uid), { role });

        // // Retrieve all users from Firestore
        // const usersSnapshot = await getDocs(collection(db, "users"));

        // // Extract user data from the snapshot
        // const usersData = usersSnapshot.docs.map((doc) => doc.data());

        // console.log("Users:", usersData);

        router.push("/login");
      } catch (error: any) {
        console.log("Registration failed", error.message);
      } finally {
        setLogging(false);
      }
    } else if (password !== confirmPassword) {
      console.log("password is not the same");
      setNoPassword(true);
      setLogging(false);
    } else if (userName === "") {
      console.log("no username added");
      setNoUser(true);
      setLogging(false);
    } else if (!checked) {
      setCheck(true);
      console.log("pls check the box");
      setLogging(false);
    } else if (userName === "") {
      setNoUser(true);
      console.log("pls add a username");
    }
  };

  console.log(userName);

  return (
    <main className="flex justify-center items-center lg:px-0 px-10">
      <div className="mt-7">
        <span className="text-3xl text-center">
          Get started by creating an account
        </span>
        <p className="text-center mt-3">
          Create an account to manage and view your tasks.
        </p>
        <div className="flex flex-col gap-4 mt-7 relative">
          <div className="">
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
              placeholder="e.g Josh Sam"
              className="w-full border h-12 outline-none pl-3"
            />
            {noUser && (
              <span className="text-red-400">please add a username</span>
            )}
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="josh@gmail.com"
              className="w-full border h-12 outline-none pl-3"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="e.g 1234"
              className="w-full border h-12  outline-none pl-3"
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
            <label htmlFor="password">Confirm password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="e.g 1234"
              className="w-full border h-12  outline-none pl-3"
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
              className={`flex justify-center items-center ${
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
            <span>I agree to the terms and conditions applied</span>
          </div>

          <Button
            text={"Create account"}
            loadingText="creating"
            textStyles="text-white"
            btnStyles="bg-green-500 w-full flex justify-center py-2 rounded-lg"
            handleClick={handleRegister}
            loading={logging}
          />
          <div className="max-w-sm justify-center items-center flex">
            <span>
              By creating an account your agree to our
              <span className="text-green-500">
                {" "}
                {"Terms of Service"}{" "}
              </span>and{" "}
              <span className="text-green-500"> {"Privacy Policy"}</span>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;

export const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" h-[7rem]">
      <div className="fixed top-0 flex w-full justify-between items-center pb-3 px-5 pt-5 shadow-sm bg-white z-30">
        <Link href="/Homepage">
          <Image src="/logo.png" width={150} height={150} alt="logo image" />
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
