import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import{ Navbar } from '../components/utility';

export default function Home() {
  return (
    <>
 <Head><title>Alpha: Home</title></Head>
    <div className="w-[96vw] mx-auto h-screen">
      <Navbar />
      <div className="flex w-full">
        <div className="w-1/2 flex flex-col justify-center items-center pt-12">
          <h1 className="text-3xl text-blue-600 font-bold">Cloud Base Attendance Tracker</h1>
          <p className='text-center text-xl m-4 text-gray-600'>{`Alpha is a "Cloud Based Attendace Tracker" system allows to keep a students attendace and records from anywhere in the world.`}</p>
          <div className="w-full mt-4 flex justify-center">
          <Link href="/" className="w-1/4 h-12 mx-4">
            <button className="w-full h-full text-white font-bold text-xl tracking-wider bg-gradient-to-r from-blue-500 to-indigo-700 rounded-2xl hover:drop-shadow-lg">Learn More</button>
          </Link>
          <Link href="/login/user-login" className="w-1/4 h-12">
            <button className="h-full w-full text-white font-bold text-xl tracking-wider bg-gradient-to-r from-indigo-700 to-blue-500 rounded-2xl hover:drop-shadow-lg">Login</button>
          </Link>
            
          </div>
        </div>
        <div>
          <div className="w-full">
            <Image
              src="/coverImg.svg"
              className="mt-12"
              alt="Picture of the author"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
