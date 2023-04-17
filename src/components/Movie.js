import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { handleLiked, saveShow } from '../features/rowSlice'

const Movie = ({ item, type }) => {
  const dispatch = useDispatch()

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' >
      <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item.title} />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item.title}</p>
        <p onClick={() =>
          dispatch(
            saveShow({
              title: item.title,
              id: item.id,
              img: item.backdrop_path,
              type: type
            })
          )
        }>
          {item.liked ?
            (
              <FaHeart
                className='absolute top-4 left-4 text-gray-300'

              >

              </FaHeart>
            )
            : (
              <FaRegHeart
                className='absolute top-4 left-4 text-gray-300'
              >
              </FaRegHeart>
            )
          }
        </p>
      </div>
    </div>
  )
}

export default Movie