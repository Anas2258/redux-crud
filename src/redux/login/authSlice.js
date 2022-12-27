import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { loginAuth } from "./authActions";

const loginToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  user: '',
  loading: false,
  error: '',
  loginToken,
  success: false
};

export const loginAuth = createAsyncThunk('login/loginAuth', async (data, { rejectWithValue }) => {
  const { email, password } = data;
  // console.log(email, 'email')
  // console.log(password, 'password')
  try {
    const { data } = await axios.post(process.env.REACT_APP_LOGIN_URL, { email, password });
    localStorage.setItem('token', data.token);
    return data;
  }catch (error) {
    // return custom error message from API if any
    // console.log(error.response.status, ';sd')
    if (error.response && error.response.status) {
      return rejectWithValue(error.response.status)
    } 
      return rejectWithValue(error.message)
  }
});

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearState : (state) => {
        state.success = false
        state.loginToken = null
    }
  },
  extraReducers: {
    [loginAuth.pending]: (state) => {
      state.loading = true;
      state.error = '   '
    },
    [loginAuth.fulfilled]: (state, { payload: { user, token } }) => {
      state.loading = false
      state.success = true
      state.loginToken = token
    },
    [loginAuth.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addToken, addUser, clearState } = authSlice.actions;
export default authSlice.reducer;
