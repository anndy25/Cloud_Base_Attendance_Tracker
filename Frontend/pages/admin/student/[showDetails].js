import React from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrPrevious } from "react-icons/gr";
import Swal from "sweetalert2";
import { Navtab } from "../../../components/utility";
import { formatDate } from "../../../functions/time";

const ShowDetails = ({ student }) => {
  const router = useRouter();
  async function deleteUser() {
    Swal.fire({
      title: `<small>Do you want to delete "${student.fname}'s" account<small>`,
      showCancelButton: true,
      cancelButtonColor: "green",
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/student/${student._id}`
          );
          const response = await axios.post(
            `/api/revalidateUser?role=student&id=${student._id}`
          );

          if (response.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Student account deleted!",
              showConfirmButton: false,
              timer: 2000,
            });
            router.push("/admin/dashboard");
          }
        } catch (err) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Server error!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  }

  return (
    <>
      <Head>
        <title>Alpha | {student.fname}</title>
      </Head>

      <div className="bg-slate-50">
        <div className="shadow-md border-b bg-white">
          <Navtab />
        </div>

        <Link
          href="/admin/dashboard"
          className="p-2 rounded-lg font-semibold justify-center items-center bg-slate-300 flex cursor-pointer w-28 m-8"
        >
          <GrPrevious /> <span className="mx-1">Go Back</span>
        </Link>
        <div className="w-5/12 mx-auto mb-6 border-2 border-indigo-700 rounded-2xl shadow-md bg-white">
          <div className="w-[80%] mx-auto py-8">
            <Image
              src={student.image.url}
              width="120"
              height="120"
              className="w-28 h-28 border mx-auto rounded-full my-4"
              alt="student photo"
            />
            <div className=" w-full mb-6 group">
              <label htmlFor="full-name" className="font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                className=" p-2 border-b-2 block  focus:outline-none w-full"
                placeholder="eg. Aniket Satish Mane"
                value={student.fname}
              />
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="dob" className="font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className=" p-2 border-b-2 block  focus:outline-none w-full"
                value={formatDate(student.dob)}
              />
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                value={student.email}
              />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="phone" className="font-medium">
                Phone Number
              </label>
              <input
                type="number"
                name="email"
                id="email"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                value={student.phoneNumber}
              />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="regId" className="font-medium">
                Reg. Id
              </label>
              <input
                type="text"
                name="regId"
                id="regId"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                value={student.regNo}
              />
            </div>

            <div className="w-full mb-6 group">
              <label htmlFor="dept" className="font-medium">
                Department
              </label>
              <input
                type="text"
                name="dept"
                id="dept"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                value={student.departmentId.departmentName}
              />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="class_" className="font-medium">
                Class
              </label>
              <input
                type="text"
                name="class_"
                id="class_"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                value={student.classId.className}
              />
            </div>
            <div className="flex justify-between">
              <div className="text-slate w-[70%]">
                <h1 className="font-semibold">Delete this account</h1>
                <h2 className="text-sm">
                  Once you delete a account, there is no going back. Please be
                  certain.
                </h2>
              </div>

              <div className="flex items-end">
                <button
                  onClick={deleteUser}
                  className="w-full font-semibold text-sm text-red-600 border-2 px-2 py-3 border-red-600 hover:text-white hover:bg-red-600 rounded-md "
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/allStudents`
  );
  return {
    paths: data.students.map((student) => ({
      params: { showDetails: student._id },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/student/${params.showDetails}`
  );

  const { student } = data;

  if (!student) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      student,
    },
  };
}

export default ShowDetails;
