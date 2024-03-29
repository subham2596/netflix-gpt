import React from 'react'
import { useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import useMainTrailer from '../hooks/useMainTrailer';

const VideoBackground = ({videoId}) => {
    useMainTrailer(videoId);

    const trailer = useSelector(appStore => appStore.movie.trailerVideo);
    
    
  
  const handleLoopVideo = () => {
    const iframe = document.getElementById('youtube-video');
  
    if (iframe) {
      iframe.addEventListener('load', function() {
        const player = iframe.contentWindow.document.getElementById('movie_player');
  
        if (player) {
          player.addEventListener('onStateChange', function(event) {
            if (event.data === 0) {
              iframe.contentWindow.location.reload();
            }
          });
        }
      });
    }
  }


  return (
    <div>
        <div>
            <iframe onLoad={handleLoopVideo} className='w-screen h-screen aspect-video'
            src={"https://www.youtube.com/embed/" + trailer?.key + "?&autoplay=1&mute=1&loop=1"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    </div>
  )
}

export default VideoBackground;