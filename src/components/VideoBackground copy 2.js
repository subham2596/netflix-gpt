import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const VideoBackground = ({ videoId }) => {
  const trailer = useSelector((appStore) => appStore.movie.trailerVideo);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-video', {
        videoId: trailer?.key,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: trailer?.key // Necessary for the loop parameter to work
        },
        events: {
          onReady: (event) => event.target.playVideo(),
          // Loop the video when it ends
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    };
  }, [trailer]);

  return (
      <div>
        <iframe id="youtube-video" className="w-screen h-screen aspect-video" src={`https://www.youtube.com/embed/${trailer?.key}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${trailer?.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </div>
  );
};

export default VideoBackground;
