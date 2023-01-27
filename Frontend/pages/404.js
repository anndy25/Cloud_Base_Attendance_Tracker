import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const errorPage = () => {
  return (
    <>
      <Head>
        <title>Alpha | Page Not Found</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div >
      
          <Image
              src="/404.svg"
           
              alt="Picture of the author"
              width={500}
              height={500}
            />
        </div>

        <p>{`Oops! We can't find the page you were looking for.`}</p>
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
