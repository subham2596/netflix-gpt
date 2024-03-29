import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovie = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
        
      } catch (error) {
        console.log(error);
      }
      
    }
  
    useEffect(()=>{
      getNowPlayingMovies();
    }, [])
}

export default useNowPlayingMovie;