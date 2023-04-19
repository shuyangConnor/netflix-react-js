import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'


const SavedShows = () => {
  const userEmail = useSelector((state) => state.user.userEmail)
  const [movies, setMovies] = useState([])

  const slider = useRef(null)

  const slideLeft = () => {
    console.log("LEFT")
    slider.current.scrollLeft = slider.current.scrollLeft - 500
  }

  const slideRight = () => {
    console.log("LEFT")
    slider.current.scrollLeft = slider.current.scrollLeft + 500
  }

  const movieRef = doc(db, 'users', `${userEmail}`)
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${userEmail}`), (doc) => {
      setMovies(doc.data()?.savedShows)
    })
    // console.log("OOL")
  }, [userEmail])

  return (
    <div>
      <h2 className='text-white font-bold md:text-xl p-4'>
        My Shows
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slideLeft()}
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block">
        </MdChevronLeft>
        <div id="slider" ref={slider} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {movies.map((item, id) => {
            return (<div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' >
              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item.img}`} alt={item.title} />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item.title}</p>
                <p onClick={() => { deleteShow(item.id) }} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose></AiOutlineClose></p>
              </div>
            </div>)
          })}
        </div>
        <MdChevronRight
          onClick={() => slideRight()}
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block">
        </MdChevronRight>
      </div>
    </div>
  )
}

export default SavedShows