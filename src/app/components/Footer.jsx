"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-white border-t border-gray-800 footer">
      <div className="container flex items-center justify-between p-8">
        <Image src="/images/logo_3.png" alt="about me" width={80} height={80} />
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
