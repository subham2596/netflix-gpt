import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovie = () => {
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
      try {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
        const json = await data.json();
        dispatch(addPopularMovies(json.results));
        
      } catch (error) {
        console.log(error);
      }
      
    }
  
    useEffect(()=>{
      getPopularMovies();
    }, [])
}

export default usePopularMovie;