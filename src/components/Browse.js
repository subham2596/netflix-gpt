import React from 'react'
import PrimaryContainer from './PrimaryContainer'
import useNowPlayingMovie from '../hooks/useNowPlayingMovie'
import SecondaryContainer from './SecondaryContainer';
import GPTSearch from './GPTSearch';
import { useDispatch, useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import usePopularMovie from '../hooks/usePopularMovie';
import useTopRatedMovie from '../hooks/useTopRatedMovie';
import useUpcomingMovie from '../hooks/useUpcomingMovie';
import VideoBackground from './VideoBackground';
import { RiCloseCircleFill } from "react-icons/ri";
import { addCurrentVideo } from '../utils/movieSlice';

const Browse = () => {
  const dispatch = useDispatch()
  const showGPTSearch = useSelector(appStore=>appStore.GPTSearch.showGPTSearch);
  const currentVideoId = useSelector(appStore=>appStore.movie.currentVideo);
  useNowPlayingMovie();
  usePopularMovie();
  useTopRatedMovie();
  useUpcomingMovie();

  const handleCloseVideo = () => {
    dispatch(addCurrentVideo(null))
  }
  return (
    <div className='relative'>
      <div>
        {
          showGPTSearch ? <GPTSearch />
                        : <div className={currentVideoId?"blur-sm" : "blur-none"}>
                            <PrimaryContainer />
                            <SecondaryContainer />
                          </div>
        }
        
        
      </div>
      {
        currentVideoId && 
        <div className='w-full h-full flex justify-center items-center fixed top-0 bg-black bg-opacity-65'>
          <div className='w-[90%] md:w-[60%]'>
            <div className='text-white flex justify-between items-center mb-5'>
              <h1 className='text-lg underline'>No Subscription - You are viewing the trailer of the selected video here -</h1>
              <button className='cursor-pointer' onClick={handleCloseVideo}><RiCloseCircleFill className='w-8 h-8' /></button>
            </div>
            <VideoBackground videoId={currentVideoId} videoWidth={"w-full"} videoHeight={"h-full"} />
          </div>
        </div>
        
      }
    </div>
  )
}

export default Browse;