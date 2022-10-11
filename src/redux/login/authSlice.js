import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { loginAuth } from "./authActions";

const loginToken = localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : null

const initialState = {
    user: '',
    token: '',
    loading: false
}


export const loginAuth = createAsyncThunk(
    'login',
    async (body) => {
        const res = await fetch(
            'https://reqres.in/api/login',{
                method: 'post',
                headers:{

                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(body)
            })
        try {

            return res.json()
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // }
            // const { data } = await 
            // localStorage.setItem('loginToken', data.token)
            // return data
        } catch (error) {
                console.log(error)
            
        }
        }
)

export const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        addToken:(state, action) => {
            state.token = localStorage.getItem('token')
        },
        addUser:(state, action) => {
            state.user = localStorage.getItem('user')
        }
    },
    extraReducers: {
        [loginAuth.pending] : state => {
            state.loading = true
        },
        [loginAuth.fulfilled]: (state, {payload:{user,token} }) => {
            state.loading = false
            state.user = user
            state.token = token
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('user', JSON.stringify(user))
        },
        [loginAuth.rejected]: (state, action) => {
            state.loading = false
        }
    }
})

export const { addToken, addUser } = authSlice.actions
export default authSlice.reducer
