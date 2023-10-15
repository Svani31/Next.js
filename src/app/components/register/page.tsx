"use client";
import React, { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import "./page.css";
import reducer, { ACTION_TYPES, initalValue } from "@/app/utils/reducer";
import { useRouter } from "next/navigation";

interface LoginProps {
  username: string;
  password: string;
}

function Register() {
  const [state, dispatch] = useReducer(reducer, initalValue);
  const [loginInfo, setLoginInfo] = useState<LoginProps>({
    username: "",
    password: "",
  });
  const [userExists, setUserExists] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userInfo: any) => {
    try {
      const checkUser = await fetch("https://next-js-orcin-kappa.vercel.app/userCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const {checkData}  = await checkUser.json();
      checkData === false ? setUserExists(true) : ""
      // if (checkData) {
      //   console.log(checkData,"2")
      //   setUserExists(true);
      //   return;
      // }

      const respons = await fetch("https://next-js-orcin-kappa.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await respons.json();
      console.log(data);
      alert("User Created Success");
      route.push("/components/todo");
    } catch (error) {
      return setUserExists(true)
    }
  };

  const loginHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="register flex justify-start m-auto items-start h-screen p-8 border-white flex-col">
      <div
        style={
          state.isAccount
            ? { position: "absolute", transform: "translateX(-400px)" }
            : { visibility: "visible" }
        }
        className="transition ease-in-out p-7 border-2 mt-6 rounded-xl bg-transparent border-rose-500"
      >
        <form
          className="flex flex-col gap-5 bg-transparent"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-white font-bold text-3xl text-center bg-transparent">
            Registration
          </h1>
          <input
            className="bg-transparent border border-white placeholder-rose-500 placeholder-font-bold outline-none rounded-md p-2 text-rose-500"
            {...register("username", { required: true })}
            placeholder="Enter Your UserName"
          />
          {errors.username && (
            <span className="bg-transparent text-red-700">
              this field is requierd
            </span>
          )}
          <input
            className="bg-transparent border border-white placeholder-rose-500 placeholder-font-bold outline-none rounded-md p-2 text-rose-500"
            {...register("email", { required: true })}
            placeholder="Enter Your email"
          />
          {errors.email && (
            <span className="bg-transparent text-red-700">
              this field is requierd
            </span>
          )}
          <input
            className="bg-transparent border border-white placeholder-rose-500 placeholder-font-bold outline-none rounded-md p-2 text-rose-500"
            {...register("password", { required: true })}
            placeholder="Enter Your Password"
            type="password"
          />
          {errors.password && (
            <span className="bg-transparent text-red-700 mt-0">
              this field is requierd
            </span>
          )}
          {userExists ? (
            <h1 className="bg-transparent text-red-800 text-xl font-bold">
              User Alredy Exist
            </h1>
          ) : (
            ""
          )}
          <button className="bg-rgb-189-139-97 p-2 border border-rose-500 rounded-md text-white text-xl hover:bg-red-700 transition-all duration-300">
            Registration
          </button>
          <h1
            onClick={() => dispatch({ type: ACTION_TYPES.HAVE_ACCOUNT })}
            className="cursor-pointer bg-transparent text-2xl text-rose-500 font-bold"
          >
            alredy have account
          </h1>
        </form>
      </div>

      <div
        style={
          state.isAccount
            ? { visibility: "visible" }
            : { visibility: "hidden", display: "none" }
        }
        className="p-7 border-2 mt-6 rounded-xl bg-transparent border-rose-500"
      >
        <form
          className="flex flex-col gap-10 bg-transparent"
          // onSubmit={}
        >
          <h1 className="text-white font-bold text-3xl text-center bg-transparent">
            Log In
          </h1>
          <input
            className="bg-transparent border border-white placeholder-rose-500 placeholder-font-bold outline-none rounded-md p-2 text-rose-500"
            placeholder="Enter Your UserName"
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          />
          <input
            className="bg-transparent border border-white placeholder-rose-500 placeholder-font-bold outline-none rounded-md p-2 text-rose-500"
            placeholder="Enter Your Password"
            type="password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
          <button
            onClick={(e) => loginHandler(e)}
            className="bg-rgb-189-139-97 p-2 border border-rose-500 rounded-md text-white text-xl hover:bg-red-700 transition-all duration-300"
          >
            Log In
          </button>
          <h1
            onClick={() => dispatch({ type: ACTION_TYPES.HAVE_ACCOUNT })}
            className="cursor-pointer bg-transparent text-2xl text-rose-500 font-bold"
          >
            Dont Have Account?
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Register;
