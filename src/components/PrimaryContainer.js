import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useSelector } from 'react-redux';

const PrimaryContainer = () => {
  const movies = useSelector(appStore => appStore.movie.nowPlayingMovies);
  if(!movies) return;

  const mainMovie = movies[0];
  const { original_title, overview, id} = mainMovie;

  return (
    <div className='primary-container relative h-[550px] md:h-screen bg-black'>
      <VideoTitle title={original_title} overview={overview} />
      <div className='w-screen md:h-screen'>
        <VideoBackground videoId={id} videoWidth={"w-screen"} videoHeight={"md:h-screen"} />
      </div>
    </div>
  )
}

export default PrimaryContainer