import React, { useRef, useState } from 'react'
import Header from './Header';
import { validateEmailPassword } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';

const SignInUp = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const fullname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

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
                console.log(user);
                navigate("/browse");
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
                navigate("/browse");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }

    }
  return (
    <div className="absolute w-screen h-screen bg-cover bg-center text-white flex justify-center items-center" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_medium.jpg')"}}>
        <div onSubmit={(e)=>{e.preventDefault()}} className='w-1/3 bg-black bg-opacity-75 p-14 rounded-lg '>
            <form className='flex flex-col gap-10'>
                {!isSignIn && <input ref={fullname} type="text" placeholder='Fullname' className='rounded-md p-3 w-full bg-[#333]' />}
                <input ref={email} type="text" placeholder='Email or phone number' className='rounded-md p-3 w-full bg-[#333]' />
                <input ref={password} type="password" placeholder='Password' className='rounded-md p-3 w-full bg-[#333]' />
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

export default SignInUp