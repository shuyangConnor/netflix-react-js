import React, { useRef, useEffect } from 'react'
import { fetchRowURL } from '../features/rowSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import Movie from './Movie'

const Row = ({ title, fetchURL }) => {

  const dispatch = useDispatch()

  const movies = useSelector((state) => {
    switch (title) {
      case "Up Coming":
        return state.row.upComingMovies
      case "Popular":
        return state.row.popularMovies
      case "Trending":
        return state.row.trendingMovies
      case "Top Rated":
        return state.row.topRatedMovies
      case "Horror":
        return state.row.horrorMovies
      default:
        return []
    }
  })

  const slider = useRef(null)

  useEffect(() => {
    dispatch(fetchRowURL({ type: title, url: fetchURL }))
  }, [fetchURL])

  const slideLeft = () => {
    console.log("LEFT")
    slider.current.scrollLeft = slider.current.scrollLeft - 500
  }

  const slideRight = () => {
    console.log("LEFT")
    slider.current.scrollLeft = slider.current.scrollLeft + 500
  }

  return (
    <div>
      <h2 className='text-white font-bold md:text-xl p-4'>
        {title}
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slideLeft()}
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block">
        </MdChevronLeft>
        <div id="slider" ref={slider} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {movies.map((item, id) => {
            return <Movie item={item} key={item.id}></Movie>
          })}
        </div>
        <MdChevronRight
          onClick={() => slideRight()}
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block">
        </MdChevronRight>
      </div>
    </div >
  )
}

export default Row