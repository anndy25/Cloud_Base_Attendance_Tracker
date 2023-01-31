import React from 'react'
import Head from "next/head";
import { MainCropper } from '../../components/admin';

const studentRegistration = () => {
  return (
    <>
      <Head>
        <title>Alpha | Student Registration</title>
      </Head>
      <div className=' w-[99%] min-h-screen'>
        <div className='mt-12 mb-6 w-5/12 mx-auto rounded-xl min-h-screen shadow-lg border'>
          <div className='w-full'>
              <MainCropper/> 
          </div>

        </div>
      </div>

    </>

  )
}

export default studentRegistration;