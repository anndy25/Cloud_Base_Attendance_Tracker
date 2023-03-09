import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';

import { SidePanel, Navtab, Loader, Error, } from '../../components/utility';
import { Overview, StudentList, TeacherList, SearchBox ,DropDownCreate} from '../../components/admin';
import { useQuery } from 'react-query';
import Swal from "sweetalert2";
import axios from 'axios';

const Dashboard = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery("admin-overview", adminOverview,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const [tab, setTab] = useState(1);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (data) {
      setStudents(data.students);
      setTeachers(data.teachers);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    if (error && error.response && error.response.status === 401) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Access Denied, Please Login Again!',
        showConfirmButton: false,
        timer: 2000
      })
      router.push('/login/admin-login')
      return "";
    } else {
      return <Error />
    }
  }




  function filterData(data, search) {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) =>
        item.regNo.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
  const searchUsers = (search) => {
    if (tab === 1) {
      setStudents(filterData(data.students, search));
    } else {
      setTeachers(filterData(data.teachers, search));
    }
  }

  return (
    <>
      <Head>
        <title>Alpha | Admin Dashboard</title>
      </Head>
      <div className='min-h-screen flex justify-center'>
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-indigo-200">
          <SidePanel status={3} />
        </div>
        <div className='w-[82%] bg-slate-50'>
          <div className='shadow-md bg-white'>
            <Navtab />
          </div>
          <section className='w-[90%] min-h-screen  px-4 flex flex-col items-center '>
            <h1 className="font-bold text-2xl text-gray-600 my-6 w-full px-4">Dashboard</h1>
            <div className='w-[95%] flex justify-between'>
              <Overview students={data.students} teachers={data.teachers} />
            </div>
            <div className='w-[95%] my-8 border rounded-2xl shadow-md overflow-x-auto bg-white'>
              <div className='flex justify-between items-center border-b '>
                <div className='w-full flex'>
                  <span className={`px-6 py-3 font-semibold border-b-2 ${tab === 1 ? ' bg-indigo-600 text-white' : 'text-gray-500 hover:text-indigo-600  hover:border-indigo-600'}  cursor-pointer `} onClick={() => setTab(1)}>Students</span>
                  <span className={`px-6 py-3 font-semibold border-b-2 ${tab === 2 ? ' bg-indigo-600  text-white' : 'text-gray-500 hover:text-indigo-600  hover:border-indigo-600'}  cursor-pointer `} onClick={() => setTab(2)}>Teacher</span>
                </div>
                <DropDownCreate />
              </div>
              <SearchBox searchContent={searchUsers} placeholder={'"Search by Registration ID"'} />
              {
                tab === 1 ? (<StudentList students={students} />) : (<TeacherList teachers={teachers} />)
              }

            </div>
          </section>

        </div>
      </div>
    </>
  )
}


async function adminOverview() {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview/admin`, {
    withCredentials: true,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return data;

}






export default Dashboard