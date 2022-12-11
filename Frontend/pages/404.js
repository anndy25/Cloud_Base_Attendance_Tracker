import React from "react";
import Head from "next/head";
import Link from "next/link";

const errorPage = () => {
  return (
    <>
      <Head>
        <title>Alpha | Page Not Found</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="w-1/2 h-1/2 ">
          <img
            src="./404.svg"
            alt="Picture of the author"
            className="w-full h-full"
          />
        </div>

        <p>Oops! We can't find the page you were looking for.</p>
        <Link href="/" className="mt-4 font-bold tracking-wider bg-gradient-to-r text-white from-blue-500 to-indigo-700 rounded-2xl hover:drop-shadow-lg h-12 w-1/5">
          <button  className="w-full h-full">
            Back To Homepage
          </button>
        </Link>
      </div>
    </>
  );
};

export default errorPage;
