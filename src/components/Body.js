import React, { useEffect } from 'react'
import { Outlet, useNavigate} from "react-router-dom";
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';



const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate("/browse");
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
            }
          });

          return ()=>{
            unsubscribe();
          }
    }, [])

  return (
    <div className='relative'>
        <Header />
        {/* <RouterProvider router={appRouter} /> */}
        <Outlet />
    </div>
  )
}

export default Body