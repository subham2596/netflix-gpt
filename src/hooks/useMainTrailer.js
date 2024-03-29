import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

const useMainTrailer = (videoId) => {
    const dispatch = useDispatch();

    const getTrailerClip = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + videoId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        console.log(json.results);
        if(!json.results) return;
        const trailers = json.results.filter((clip)=>{
            return clip.type === "Trailer"
        })
        dispatch(addTrailer(trailers[0] ? trailers[0] : json.results[0]))

      }
    
      useEffect(()=> {
        getTrailerClip();
      }, [])
}

export default useMainTrailer