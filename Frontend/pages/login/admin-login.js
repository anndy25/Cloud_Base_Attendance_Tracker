import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const validationSchema = yup.object({
    email: yup
        .string()
        .lowercase()
        .email("Invalid Email Address")
        .required("Please Enter Your Email Address"),
    password: yup.string().min(5, "Password should be at least 5 characters"),
});

const formInputList = [
    { key: 0, label: "Email", name: "email", type: "email", required: true },
    {
        key: 1,
        label: "Password",
        name: "password",
        type: "password",
        required: true,
    },
];

const login = () => {
    return (
        <>
            <Head>
                <title>Alpha: Admin Login</title>
            </Head>
            <div className="flex w-screen h-screen">
                <div className="h-full w-1/2  flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-700">
                    <Image
                        src="/admin-login.svg"
                        className="mt-12"
                        alt="Picture of the author"
                        width={550}
                        height={600}
                    />
                </div>
                <div className="h-full w-1/2  text-slate-700">
                    <div className="w-3/4 mx-auto mt-12 flex  items-center">
                        <div className="h-16 w-12 relative">
                            <Image
                                src="/logo.png"
                                alt="Picture of the author"
                                layout="fill"
                            />
                        </div>

                        <div className="font-bold text-4xl ml-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-blue-800 italic">
                            Alpha
                        </div>
                    </div>
                    <div className="flex flex-col h-3/4 justify-end items-center w-full">
                        <h1 className="font-bold text-4xl w-3/4 tracking-wide mb-16">
                            Admin Login
                        </h1>
                        

                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={async (values) => {
                                const { email, password } = values;
                                try {
                                    window.location.reload();
                                } catch (err) { }
                            }}
                            validationSchema={validationSchema}
                        >
                            <Form
                                className="flex flex-col items-center justify-center w-3/4 mb-12"
                                autoComplete="nope"
                            >
                                {formInputList.map((item, index) => (
                                    <div key={index} className="w-full">
                                        <label
                                            htmlFor={item.name}
                                            className={`mt-5 w-full font-bold ${item.required
                                                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                                                : null
                                                } `}
                                        >
                                            {item.label}
                                        </label>
                                        <Field
                                            className="my-4 w-full  py-2 px-3 rounded-md border border-slate-300 shadow-sm bg-gray-50 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 invalid:border-red-500 
                focus:invalid:border-red-500 focus:invalid:ring-red-500 selection:bg-amber-500 selection:text-white "
                                            type={item.type}
                                            name={item.name}
                                            placeholder={item.label}
                                            maxLength={item.maxLength}
                                            autoComplete="off"
                                        />
                                        <ErrorMessage
                                            className="italic w-full text-red-500 text-sm "
                                            name={item.name}
                                            component="div"
                                        />
                                    </div>
                                ))}
                                {/* Submit Button */}
                                <button
                                    className="p-3 w-full mt-5 text-white font-bold tracking-wider bg-gradient-to-r from-blue-500 to-indigo-700 rounded-2xl hover:drop-shadow-lg"
                                    type="submit"
                                >
                                    Login
                                </button>
                                <Link href="/login/user-login">
                                    <p className="text-center my-4 text-indigo-500 hover:cursor-pointer">
                                        Login as a User?
                                    </p>
                                </Link>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default login;
