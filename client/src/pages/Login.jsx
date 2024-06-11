import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import Loading from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import {toast} from "sonner";


const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const submitHandler = async (data) => {
    try{
// const result = await login(data).unwrap();
const result = await login(data);
// console.log(result);
dispatch(setCredentials(result))
navigate("/");

    }catch(error){
console.log(error);
toast.error(error?.data?.message);
    }
  };

  // useEffect(() => {
  //   user && navigate("/log-in");
  // }, [user]);

  return (
    
   <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row gradient-bkg-overall'>
    <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
      {/* left side */}
      <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='text-transparent flex gap-1 py-1 px-3 text-sm md:text-base'>
              Manage all your tasks with ease!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-white'>
              <span>ArtZoro</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
             {/* <img class="illustration" src="" alt="" /> */}
            </div>
          </div>
        </div>
     {/* right side */}
     <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-purple-700 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credentials safe.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-500 hover:text-purple-700 hover:underline cursor-pointer'>
               Oh oh! Did you forget your password?
              </span>

{/* if loading is true, show loader, else, show button */}
            { isLoading ? (<Loading />) : (<Button
                type='submit'
                label='Submit'
                className='w-full h-10 bg-purple-700 text-white rounded-full'
              />)}
            </div>
          </form>
        </div>
    </div>
   </div>
  )
}

export default Login