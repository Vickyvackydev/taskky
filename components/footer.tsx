import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = ["About us", "Services", "Blogs", "FaQs", "Login"];
const footerIcons = [<FaFacebook />, <FaInstagram />, <FaTwitter />];
const Footer = () => {
  return (
    <main className="flex flex-col gap-10 mt-10 px-5 border-t-2 pt-5 pb-7 lg:items-center items-start">
      <div className="flex flex-col justify-center lg:items-center items-start gap-5">
        <Link href="/">
          <Image src="/logo.png" width={150} height={150} alt="logo image" />
        </Link>
        <div className="flex gap-10 lg:flex-row flex-col">
          {footerLinks.map((links) => (
            <span>{links}</span>
          ))}
        </div>
      </div>
      <div className="flex justify-between lg:flex-row flex-col-reverse lg:items-center items-start gap-7">
        <span>Terms and condition</span>
        <div className="flex gap-10 lg:flex-row">
          {footerIcons.map((icon) => (
            <span>{icon}</span>
          ))}
        </div>
        <span>copyright </span>
      </div>
    </main>
  );
};

export default Footer;
