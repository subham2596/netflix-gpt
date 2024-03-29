import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "GPTSearch",
    initialState: {
        showGPTSearch: false
    },
    reducers: {
        enableGPTSearch: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        }
    }
})

export const { enableGPTSearch } = gptSlice.actions;
export default gptSlice.reducer;