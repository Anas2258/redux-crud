import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import {authSlice} from './login/authSlice'
import { productsReducer } from './products/productsSlice';
import { categoriesReducer } from './products/categorySlice';

const persistConfig = {
key: 'root',
storage,
// stateReconciler: autoMergeLevel2
}
 
const persistedReducer = persistReducer(persistConfig, productsReducer)
export const store = configureStore({
    reducer: {
        login: authSlice.reducer,
        products: productsReducer,
        categories: categoriesReducer
        // devTools: true,
        // middleWare: [thunk]
    },
    //  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // })
})

export const persistor = persistStore(store)