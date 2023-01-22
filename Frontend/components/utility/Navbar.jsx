import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between h-20 py-1 ">
      <div className="flex items-center">
        <div className="h-full w-12 relative">
          <Image src="/logo.png" alt="Picture of the author" layout="fill" />
        </div>
        <h1 className="ml-3 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-900">
          Alpha
        </h1>
      </div>

      <div className="flex h-full justify-between items-center text-xl w-[30%] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-800">
        <Link href="/" className={router.pathname == "/" ? "bg-blue-600 text-white p-3 rounded-md" : " rounded-md p-3 hover:bg-blue-600 hover:text-white" }>
          <span >Home</span>
        </Link>
        <Link href="/college/blogs" className={router.pathname == "/blog" ? "bg-blue-600 text-white p-3 rounded-md" : " rounded-md p-3 hover:bg-blue-600 hover:text-white"}>
          <span >Blogs</span>
        </Link>
        <Link href="/college/about-us" className={router.pathname == "/about" ?"bg-blue-600 text-white p-3 rounded-md" : " rounded-md p-3 hover:bg-blue-600 hover:text-white"}>
          <span >About</span>
        </Link>
        <Link href="/college/contact-us" className={router.pathname == "/contact" ? "bg-blue-600 text-white p-3 rounded-md" : "rounded-md p-3 hover:bg-blue-600 hover:text-white"}>
          <span >Contact Us</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
