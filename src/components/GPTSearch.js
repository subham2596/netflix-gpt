import React, { useEffect, useRef } from 'react';
import { BG_IMG_URL } from '../utils/constants';
import { FaSearchengin } from "react-icons/fa6";
import openai from '../utils/open-ai';

const GPTSearch = () => {
    const searchText = useRef(null);
    
    const handleSearchSuggestions = async () => {
        const userInput = searchText.current.value;
        const serchQuery = `Please act as a movie recommendation system and suggest 5 movies based on input - ${userInput}. Suggest me only the names in the format mentioned ahead. Example - [abc, def, ghi, jkl and mno].`;
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: serchQuery }],
            model: 'gpt-3.5-turbo',
        });

        console.log("chatCompletion", chatCompletion)
    }

  return (
    <div className="absolute w-screen h-screen bg-cover bg-center text-white flex justify-center items-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BG_IMG_URL})`}}>
        <div className=' w-1/3 bg-black bg-opacity-80 rounded p-5'>
            <form className='flex flex-col items-center justify-center gap-4' onSubmit={(e)=>e.preventDefault()} action="">
                <input ref={searchText} type="text" className='w-full rounded-md px-3 py-2 bg-[#333]' />
                <button className='bg-red-600 w-1/2 py-2 rounded-md flex items-center justify-center gap-2' onClick={handleSearchSuggestions}><FaSearchengin />Serach</button>
            </form>
        </div>
    </div>
  )
}

export default GPTSearch;