import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addCurrentVideo } from '../utils/movieSlice';

const VideoCard = ({videoInfo}) => {
    const { poster_path, original_title, id} = videoInfo;

    const dispatch = useDispatch();
    const handleClickOnVideoCard = (id) => {
      dispatch(addCurrentVideo(id));
    }
  return (
    <div>
        <div className='video-card w-44 hover:scale-110 transition-transform duration-500 cursor-pointer'>
            <img className='rounded-xl ' src={IMG_CDN_URL + poster_path} alt={original_title} onClick={()=>{
              handleClickOnVideoCard(id);
            }} />
        </div>
    </div>
  )
}

export default VideoCard