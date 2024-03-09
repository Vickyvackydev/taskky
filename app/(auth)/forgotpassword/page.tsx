"use client";
import Button from "@/components/Button";
import Modal from "@/components/modal";
import { auth } from "@/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";

const Forgot_Password = () => {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("email sent");
      setLoading(false);
      setEmail("");
      setModal(true);
    } catch (error) {
      console.log("error performing this action", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex justify-center items-center lg:px-0 px-6">
      <main className="flex justify-center items-center px-5 pb-7 bg-backgrd w-fit h-full rounded-xl">
        <div className="mt-7">
          <div>
            <span className="text-3xl flex justify-center text-text_black">
              Reset password
            </span>
            <p className="text-center mt-3">
              kindly send us your email address for verification
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-7 relative">
            <div className="flex flex-col">
              <label htmlFor="">Your email</label>
              <input
                type="email"
                className="lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3"
                value={email}
                placeholder="email address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <Button
              text="Reset Password"
              loadingText="verifying"
              loaderColor="#fff"
              loadingTextColor="text-white"
              textStyles="text-white"
              btnStyles="bg-green-500 w-full flex justify-center py-2 rounded-lg"
              handleClick={handleResetPassword}
              loading={loading}
            />
          </div>
        </div>
        <Modal
          isOpen={modal}
          isClose={() => setModal(false)}
          closeBtnColor=""
          maxWidth="w-[400px]"
        >
          <div className="flex justify-center items-center flex-col">
            <Image src={"/mail_giffy.gif"} width={200} height={200} alt="gif" />
            <span>
              we have sent you a reset password link, kindly check your{" "}
              <span className="text-green-400">mail</span> to continue
            </span>
          </div>
        </Modal>
      </main>
    </section>
  );
};

export default Forgot_Password;
