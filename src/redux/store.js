import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {authSlice} from './login/authSlice'
import productsReducer  from './products/productsSlice';

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, productsReducer, )

export const store = configureStore({
    reducer: {
        login: authSlice.reducer,
        products: productsReducer
        // devTools: true,
        // middleWare: [thunk]
    }
})

export const persistor = persistStore(store)