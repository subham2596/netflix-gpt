import React, { useRef, useState } from 'react'
import Header from './Header';
import { validateEmailPassword } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG_URL, USER_ICON } from '../utils/constants';
import { RxLockOpen1 } from "react-icons/rx";
import { RxLockClosed } from "react-icons/rx";

const SignInUp = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(false);
    const fullname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignIn = () => {
        setIsSignIn(!isSignIn);
    }

    const handleSignIn = () => {
        const message = validateEmailPassword(email.current.value, password.current.value);
        setErrorMessage(message);

        if(message) return;

        if(isSignIn) {
            // sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        } else {
            // sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                console.log(auth.currentUser);
                updateProfile(user, {
                    displayName: fullname.current.value, photoURL: USER_ICON
                  }).then(() => {
                    // Profile updated!
                    const {uid, email, displayName, photoURL} = user;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                  }).catch((error) => {
                    // An error occurred
                    setErrorMessage(error);
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }

    }
    const handleShowPassword = (e) => {
        setShowPassword(!showPassword);
    }

    const displayPasswordIcon = (e) => {
        if (!e.target.closest(".passwordContainer")) {
            setPasswordIcon(false);
        }
    }
  return (
    <div className="absolute w-screen h-screen bg-cover bg-center text-white flex justify-center items-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BG_IMG_URL})`}} onClick={displayPasswordIcon}>
        <div onSubmit={(e)=>{e.preventDefault()}} className='form-container w-[90%] md:w-1/3 bg-black bg-opacity-75 p-14 rounded-lg '>
            <form className='flex flex-col gap-10'>
                {!isSignIn && <input ref={fullname} type="text" placeholder='Fullname' className='rounded-md p-3 w-full bg-[#333]' />}
                <input ref={email} type="text" placeholder='Email or phone number' className='rounded-md p-3 w-full bg-[#333]' />
                <div className='relative passwordContainer'>
                    <input ref={password} onFocus={()=>{setPasswordIcon(true)}} type={showPassword? "text" : "password"} placeholder='Password' className='rounded-md p-3 pr-8 w-full bg-[#333]' />
                    {passwordIcon && 
                        <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={handleShowPassword}>
                            {showPassword ? <RxLockClosed /> :  <RxLockOpen1 />}
                        </div>
                    }
                </div>
                {errorMessage && <p className='font-bold text-red-600'>{errorMessage}</p>}
                <button className='bg-red-600 p-3 rounded-md' onClick={handleSignIn}>{isSignIn? "Sign In" : "Sign Up"}</button>
                {
                    isSignIn ? (<p><span className='text-gray-500'>New to Netflix?</span> <span className='hover:underline cursor-pointer' onClick={toggleSignIn}>Sign up now.</span></p>) :
                    (<p><span className='text-gray-500'>Already registered?</span> <span className='hover:underline cursor-pointer' onClick={toggleSignIn}>Sign in now.</span></p>)
                }
            </form>
        </div>
    </div>
  )
}

export default SignInUp;