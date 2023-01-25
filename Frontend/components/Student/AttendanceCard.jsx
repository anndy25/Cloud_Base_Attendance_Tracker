import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineSubject, MdCalendarToday } from "react-icons/md";
import { BsClockHistory} from "react-icons/bs";
import HCaptcha from '@hcaptcha/react-hcaptcha';



const AttendanceCard = (props) => {

  const captchaRef = useRef();
  const [token, setToken] = useState(null);

  function onSubmit(token) {
    alert('thanks ' + document.getElementById('field').value);
  }

  const executeCaptcha = async () => {
    try {
      let res = await captchaRef.current.execute();
      console.log("Verified asynchronously: ", res);
      setToken(res);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full bg-white shadow-lg my-2 flex justify-evenly p-4 text-lg font-semibold text-slate-600  rounded-md">
      <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject><span className='ml-2'>Radio and Electronics</span></div>
      <div className='flex items-center'><MdCalendarToday /> <span className='ml-2'>Tuesday, 2021 Jan</span></div>
      <div className='flex items-center'><BsClockHistory /><span className='ml-2'>23.23 Min</span></div>

      <button className='p-2 bg-blue-600 text-white w-28 rounded-lg' onClick={executeCaptcha}>check</button>
      <HCaptcha
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_KEY}
        onVerify={(token) => setToken(token)}
        onExpire={(e) => setToken("")}
        size='invisible'
      />
      <h1>{token}</h1>

    </div>
  )
}

export default AttendanceCard