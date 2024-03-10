import React, { useEffect } from 'react'
import SignInUp from './SignInUp';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Browse from './Browse';
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <SignInUp />
    },
    {
        path: "/browse",
        element: <Browse />
    }
])

const Body = () => {

    const dispatch = useDispatch();


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName}));
              // ...
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
            }
          });
    }, [])

  return (
    <div className='relative'>
        <Header />
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body