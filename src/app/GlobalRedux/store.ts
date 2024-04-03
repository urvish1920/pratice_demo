'use client';
import { configureStore } from "@reduxjs/toolkit";
import findRideReduce from './car-polling/findPlanRideSlice';
import planRideReduce from './car-polling/planRideDetialsSlice'
import { persistReducer,persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage";

const persistConfig={
    key:'persist-store',
    storage
}
const persistedReducerfindRide = persistReducer(persistConfig,findRideReduce)
const persistedReducerRideDetails = persistReducer(persistConfig,planRideReduce)
export const store = configureStore({
    reducer:{
        findRide:persistedReducerfindRide,
        planRide:persistedReducerRideDetails  
    }
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;