'use client';

import { Provider  } from "react-redux";
import {persistor, store } from './store';
import { PersistGate } from "redux-persist/integration/react";

export function Providers({children}:any){
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}