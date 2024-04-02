'use client';
import { configureStore } from "@reduxjs/toolkit";
import findRideReduce from './car-polling/RideplanSlice';
import { persistReducer,persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";

const persistConfig={
    key:'persist-store',
    storage
}
const persistedReducer = persistReducer(persistConfig,findRideReduce)
export const store = configureStore({
    reducer:{
        findRide:persistedReducer     
    }
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;