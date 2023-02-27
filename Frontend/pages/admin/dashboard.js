import React, { useState } from 'react';
import Head from "next/head";
import { SidePanel, Navtab, } from '../../components/utility';
import { Overview, StudentList, TeacherList, DropDownCreate, SearchBox } from '../../components/admin';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';

const Dashboard = ({ cookie }) => {

  const { data } = useQuery("admin-overview", () => adminOverview(cookie),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });


  let [tab, setTab] = useState(1);
  const [students, setStudents] = useState(data.students);
  const [teachers, setTeachers] = useState(data.teachers);

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
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={3} />
        </div>
        <div className='w-[82%] '>
          <div className='border shadow-md bg-white'>
            <Navtab />
          </div>
          <section className='w-[90%] min-h-screen  px-4 flex flex-col items-center'>
            <h1 className="font-bold text-2xl text-gray-600 my-6 w-full px-4">Dashboard</h1>
            <div className='w-[95%] flex justify-between'>
              <Overview students={data.students} teachers={data.teachers} />
            </div>
            <div className='w-[95%] my-8 border rounded-2xl shadow-lg overflow-x-auto bg-white'>
              <div className='flex justify-between items-center border-b-2 '>
                <div className='w-full flex'>
                  <span className={`px-6 py-3 font-semibold ${tab === 1 ? ' bg-blue-50 border-b-4 border-blue-700 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-slate-100'}  cursor-pointer `} onClick={() => setTab(1)}>Students</span>
                  <span className={`px-6 py-3 font-semibold ${tab === 2 ? ' bg-blue-50 border-b-4 border-blue-700 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}  cursor-pointer `} onClick={() => setTab(2)}>Teacher</span>
                </div>
                <DropDownCreate />
              </div>
              <SearchBox searchUsers={searchUsers} />
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


async function adminOverview(cookie) {

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview/admin`, {
      withCredentials: true,
      headers: {
        cookies: cookie || " "
      }
    });
    return data;
  }

  catch (error) {
    console.log(error)
  }
}

export async function getServerSideProps(context) {

  const queryClient = new QueryClient();
  const cookie = context.req.cookies.auth;

  if (!cookie) {
    return {
      redirect: {
        destination: '/login/admin-login',
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery("admin-overview", () => adminOverview(cookie));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      cookie: cookie
    },
  };
}

export default Dashboard