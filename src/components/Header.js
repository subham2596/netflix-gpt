import React from 'react';
import { PiUserListBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import { removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
    // const user = useSelector((appStore)=>{appStore})
    // console.log(user)
    const dispatch = useDispatch()

    const handleSignOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        }).catch((error) => {
        // An error happened.
        console.log("Sign out error ->", error);
        });
        
    }

  return (
    <div className='px-10 py-2 absolute z-10 w-full flex justify-between items-center'>
        <img className='w-60' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Netflix Logo" />

        <div className='text-white flex items-center'>
            <PiUserListBold className='text-3xl' />
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    </div>
  )
}

export default Header