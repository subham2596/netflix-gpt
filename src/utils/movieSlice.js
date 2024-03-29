import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trailerVideo: null,
        currentVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action)=>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action)=>{
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action)=>{
            state.upcomingMovies = action.payload;
        },
        addTrailer: (state, action)=>{
            state.trailerVideo = action.payload;
        },
        addCurrentVideo: (state, action)=>{
            state.currentVideo = action.payload;
        }
    }
})

export const { addNowPlayingMovies, addTrailer, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addCurrentVideo } = movieSlice.actions;
export default movieSlice.reducer;