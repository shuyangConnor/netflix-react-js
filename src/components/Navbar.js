import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../features/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()

  const userEmail = useSelector((state) => state.user.userEmail)

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to="/">
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
      </Link>
      {
        userEmail ? (
          <div>
            <Link to='/account'>
              <button className='text-white pr-4'>Account</button>
            </Link>
            <button
              className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
              onClick={() => { handleLogout() }}
            >
              Logout
            </button>

          </div>
        ) :
          (
            <div>
              <Link to='/login'>
                <button className='text-white pr-4'>Sign In</button>
              </Link>
              <Link to='/signup'>
                <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default Navbar