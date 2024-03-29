import React from 'react';
import { FaPlay } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='video-title bg-gradient-to-r from-black w-screen h-full absolute'>
        <div className='w-[90%] md:w-96 absolute top-1/2 md:top-[30%] left-4 md:left-14 text-white flex flex-col gap-4'>
            <h1 className='text-3xl md:text-5xl font-bold'>{title}</h1>
            <p>{overview}</p>
            <div className='buttons-container flex gap-3'>
                <button className='flex justify-center items-center gap-2 px-8 py-2 bg-gray-400 text-black rounded hover:bg-opacity-70'> <FaPlay /> Play</button>
                <button className='flex justify-center items-center gap-2 px-8 py-2 border border-white rounded hover:bg-gray-950'> <BsInfoCircleFill /> More Info</button>
            </div>
        </div>
        
    </div>
  )
}

export default VideoTitle;