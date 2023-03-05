import React, { useState } from 'react'
import Head from "next/head";
import axios from 'axios';
import { SidePanel, Navtab } from '../../../components/utility';
import { SearchBox, ScheduleTable } from '../../../components/admin';
const Schedule = ({ classes, totalStudent }) => {

  const [classes_, setClasses] = useState(classes);
  function filterData(data, search) {
    if (search === "") {
      return data;
    } else {
      return data.filter((item) =>
        item.className.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  const searchClass = (search) => {
    setClasses(filterData(classes, search));
  }

  return (
    <>
      <Head>
        <title>Alpha | Schedule</title>
      </Head>

      <div className='min-h-screen flex justify-center'>
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={3} />
        </div>
        <div className='w-[82%] min-h-screen'>
          <aside className='w-full border-l'>
            <div className='border-b-2'>
              <Navtab />
            </div>
            <div className='p-6'>
              <h1 className="font-bold text-2xl text-gray-600">Time Table</h1>
              <div className='w-4/5 mx-auto  pt-4 my-8 border-2 rounded-2xl shadow-lg overflow-x-auto'>
                <div className='pl-12'>
                  <SearchBox searchContent={searchClass} placeholder={'"Search by Class Name"'} />
                </div>
                <ScheduleTable classes_={classes_} totalStudent={totalStudent} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/class/getAll`);

  const { classes, strength } = data;

  let totalStudent = {};
  for (let i = 0; i < strength.length; i++) {
    totalStudent[strength[i]._id] = strength[i].count;
  }


  return {
    props: {
      classes, totalStudent
    },
    // revalidate: 30,
  };
}

export default Schedule