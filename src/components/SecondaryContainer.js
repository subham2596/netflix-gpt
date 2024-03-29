import React from 'react'
import VideoList from './VideoList';
import { useSelector } from 'react-redux';
import appStore from '../utils/appStore';

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(appStore => appStore.movie?.nowPlayingMovies);
  const popularMovies = useSelector(appStore => appStore.movie?.popularMovies);
  const topRatedMovies = useSelector(appStore => appStore.movie?.topRatedMovies);
  const upcomingMovies = useSelector(appStore => appStore.movie?.upcomingMovies);
  if(!nowPlayingMovies && !popularMovies && !topRatedMovies && !upcomingMovies) return;
  return (
    <div className='secondary-container bg-black px-4 md:px-14'>
      <div className='divToOverlap relative md:-translate-y-36' >
        <VideoList title={"Now Playing"} movies={nowPlayingMovies} />
        <VideoList title={"Popular"} movies={popularMovies} />
        <VideoList title={"Top Rated"} movies={topRatedMovies} />
        <VideoList title={"Upcoming"} movies={upcomingMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer;
