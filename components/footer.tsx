"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 2 }}
      className="footer p-10 bg-transparent text-base-content border-t"
    >
      <aside>
        <Image src={"/logo.png"} width={100} height={100} alt="logo image" />
        <p className="text-text_black font-medium">
          Task Management Ltd.
          <br />
          Providing reliable task management assistance since 2024.
        </p>
        <p>{`Copyright © task management team ${new Date().getFullYear()}`}</p>
      </aside>
      <nav className="text-text_black font-medium">
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Speed</a>
        <a className="link link-hover">Safety</a>
        <a className="link link-hover">Time Management</a>
        <a className="link link-hover">Best Security</a>
      </nav>
      <nav className="text-text_black font-medium">
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Faqs</a>
        <a className="link link-hover">Blog</a>
      </nav>
      <nav className="text-text_black font-medium">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </motion.footer>
  );
}

export default Footer;
