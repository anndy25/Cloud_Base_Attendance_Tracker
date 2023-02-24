import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { SidePanel, Navtab, Calender, ScheduleCard } from '../../components/utility';
import { Overview, StudentList, TeacherList, DropDownCreate, SearchBox } from '../../components/admin';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

const options = {
  position: "top-center",
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
}

const Dashboard = ({ token }) => {



  // const { data, isLoading } = useQuery("admin-overview",adminOverview,
  // {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });
  console.log(token)

  let [tab, setTab] = useState(1);
  let list = ['All', 'Name', 'Reg. No.', 'Email Id'];


  // if(isLoading) return (<h1>Loading...</h1>)


  // console.log(data);
  //  const [students,setStudents]= useState(data.students);
  //  const [teachers,setTeachers]= useState(data.teachers);


  return (
    <>
      <Head>
        <title>Alpha | Admin Dashboard</title>
      </Head>
      <div className='min-h-screen flex justify-center'>
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={3} />
        </div>
        <div className='w-[82%] flex'>
          <section className='w-[74%] min-h-screen  px-4 flex flex-col items-center'>
            <h1 className="font-bold text-2xl text-gray-600 my-6 w-full px-4">Dashboard</h1>
            <div className='w-[95%] flex justify-between'>
              <Overview />
            </div>
            <div className='w-[95%] my-8 border-t rounded-2xl shadow-md overflow-x-auto'>
              <div className='flex justify-between items-center border-b-2 '>
                <div className='w-full flex'>
                  <span className={`px-6 py-3 font-semibold ${tab === 1 ? ' bg-blue-50 border-b-4 border-blue-700 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-slate-100'}  cursor-pointer `} onClick={() => setTab(1)}>Students</span>
                  <span className={`px-6 py-3 font-semibold ${tab === 2 ? ' bg-blue-50 border-b-4 border-blue-700 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}  cursor-pointer `} onClick={() => setTab(2)}>Teacher</span>
                </div>
                <DropDownCreate />
              </div>
              <SearchBox list={list} />

              {
                tab === 1 ? (<StudentList />) : (<TeacherList />)
              }

            </div>
          </section>

          <aside className='w-1/4 border-l'>
            <div className='border-b-2'>
              <Navtab />
            </div>

            <div className='pl-5'>
              <Calender />
              <h1 className="text-lg mt-2">{`Today's Schedule`}</h1>
              <ScheduleCard />
            </div>

          </aside>
        </div>
      </div>
    </>
  )
}


async function adminOverview() {

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview/admin`);
    console.log(data);
    return data;
  }
  catch (error) {

  }
}

export async function getServerSideProps(context) {

  // const queryClient = new QueryClient();
  // console.log(req.cookies.token)
  const cookies = context.req.headers.cookie;

  if (!cookies.auth) {
    return {
      redirect: {
        destination: '/login/admin-login',
        permanent: false,
      },
    };
  }

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview/admin`, {
    withCredentials: true,
    headers: {
      cookies: cookies.auth || ""
    }

  });


  // await queryClient.prefetchQuery("admin-overview",()=> adminOverview(req));
  console.log(data);
  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      token: data

    },
  };
}

export default Dashboard