import React from 'react'
import { TbBooks } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";


const SubjectList = (props) => {
  let list = ['from-cyan-500 to-blue-500','from-indigo-500 to-purple-500','from-pink-500 to-purple-500','from-green-500 to-sky-500','from-rose-500 to-pink-500','from-cyan-500 to-teal-500']

  return (
    <div className='grid grid-cols-3 gap-4  text-white font-semibold shadow-lg'>
      <div className='h-40 rounded-md shadow-md  bg-gradient-to-r from-amber-500 to-red-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>JavaScript</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class BE 6</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 60</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
      <div className='h-40 rounded-md shadow-md  bg-gradient-to-r from-green-500 to-teal-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>JavaScript </span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class BE 7</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 60</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
      <div className='h-40 rounded-md shadow-md  bg-gradient-to-r from-pink-500 to-red-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>Andriod Development </span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class BE 7</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 60</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
      <div className='h-40 rounded-md shadow-md  bg-teal-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>Core Java </span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class TE 8</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 43</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
      <div className='h-40 rounded-md shadow-md  bg-gradient-to-r from-cyan-500 to-blue-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>Data Struture and Alogorithm</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class SE5</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 56</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
      <div className='h-40 rounded-md shadow-md  bg-slate-500 p-4 relative'>
        
        <h1 className='flex items-center'><TbBooks/> <span className='mx-2'>Networking</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Class TE6</span></h1>
        <h1 className='flex items-center text-sm'><SiGoogleclassroom/> <span className='mx-2'>Total Students : 60</span></h1>
        <button className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{backgroundColor:"rgba(255,255,255,.2)"}}>View</button>
       
      </div>
     
    </div>
  )
}

export default SubjectList