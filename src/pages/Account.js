import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <div>
      <div className='w-full text-white'>
        <img className="w-full h-[400px] object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/47c3f2ae-ffa8-4d1a-b55b-e77578d6be05/US-en-20230410-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'></div>
        <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
      </div>
      <SavedShows></SavedShows>
    </div>
  )
}

export default Account