import React from 'react';
import { PiUserListBold } from "react-icons/pi";
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { NETFLIX_LOGO } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import appStore from '../utils/appStore';
import { enableGPTSearch } from '../utils/gptSlice';

const Header = () => {
    // const user = useSelector((appStore)=>{appStore})
    // console.log(user)
    const navigate = useNavigate();
    const user = useSelector((appStore)=>appStore.user);
    console.log("user useselector ->", user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        console.log("Sign out error ->", error);
        navigate("/error");
        });
        
    }

    const handleGPTSearch = () => {
      dispatch(enableGPTSearch());
    }

  return (
    <div className='header px-4 md:px-10 py-2 absolute z-10 w-full flex justify-between items-center'>
        <img className='w-32 md:w-60' src={NETFLIX_LOGO} alt="Netflix Logo" />
        {user && 
          <div className='flex items-center gap-3'>
            <button disabled className='hidden md:block bg-gray-700 text-white rounded px-4 py-2 opacity-70 cursor-not-allowed' onClick={handleGPTSearch}>GPT Search</button>
            
            <div className='text-white flex items-center gap-2'>
                {/* <PiUserListBold className='text-3xl' /> */}
                
                <div><img className='hidden md:block w-7 rounded-sm' src={user.photoURL} alt="User Icon" /></div>
                <button onClick={handleSignOut} className='font-bold'>Sign Out</button>
            </div>
          </div>
        }
    </div>
  )
}

export default Header