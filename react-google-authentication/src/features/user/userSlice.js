import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        removeUser(state) {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export const getUser = state => state.user.user;
export const isUserLoggedIn = state => state.user.isLoggedIn;
export default userSlice.reducer;