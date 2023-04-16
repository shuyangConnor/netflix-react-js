import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../features/userSlice'
import { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Signup = () => {
  const signUpMessage = useSelector((state) => state.user.signUpMessage)
  const email = createRef()
  const password = createRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (signUpMessage == "Sign up successful.") {
      navigate("/")
    }
  }, [signUpMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUp({ email: email.current.value, password: password.current.value }))
  }
  return (
    <>
      <div className='w-full h-screen'>
        <img className="hidden sm:block absolute w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/47c3f2ae-ffa8-4d1a-b55b-e77578d6be05/US-en-20230410-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Sign Up</h1>
              {signUpMessage ? <p className='p-3 bg-red-400 my-2'>{signUpMessage}</p> : null}
              <form className='w-full flex flex-col py-4'>
                <input className='p-3 my-2 bg-gray-700 rounded'
                  type="email"
                  placeholder='Email'
                  autoComplete='email'
                  ref={email}
                />
                <input className='p-3 my-2 bg-gray-700 rounded' type="password"
                  placeholder='Password'
                  autoComplete='current-password'
                  ref={password}
                />
                <button
                  className='bg-red-600 py-3 my-6 rounded font-bold'
                  onClick={(e) => {
                    handleSubmit(e)
                  }}
                >
                  Sign Up
                </button>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p><input type="checkbox" className="mr-2" />Remember me</p>
                  <p>Need Help?</p>
                </div>
                <p className='py-8'>
                  <span className='text-gray-600 mr-2'>
                    Already subscribed to Netfliex?
                  </span>
                  <Link to="/login">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup