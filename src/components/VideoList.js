import React from 'react'
import VideoCard from './VideoCard'


const VideoList = ({title, movies}) => {
    
  return (
    <div>
        <h1 className='font-semibold py-2 text-2xl text-white'>{title}</h1>
        <div className='video-list flex items-center justify-start gap-4 overflow-x-auto overflow-y-hidden'>
          {movies?.map((movie)=>{
                return <VideoCard key={movie.id} videoInfo={movie} />
            })}
        </div>
    </div>
  )
}

export default VideoList