import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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


const persistConfig = {
key: 'root',
storage,
// stateReconciler: autoMergeLevel2
}
 
const persistedReducer = persistReducer(persistConfig, productsReducer)
export const store = configureStore({
    reducer: {
        // login: authSlice.reducer,
        products: productsReducer
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