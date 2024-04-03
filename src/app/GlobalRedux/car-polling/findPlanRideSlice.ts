// findRideSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface RideData {
    _id:string;
    user_id:string;
    pickupLocation: string;
    dropoffLocation: string;
    date: Date;
    pickupTime: string;
    dropoffTime: string;
    passenger: number;
    price: number;
    byWhichVehicleYouTravelling: string;
    noteMore: string;
}

interface FindRideState {
  planRide: RideData[];
}

const initialState: FindRideState = {
  planRide: []
};

const findRideSlice = createSlice({
  name: 'findRide',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action: PayloadAction<RideData>) => {
      state.planRide = [action.payload];
    },
  },
});

export const { fetchDataSuccess } = findRideSlice.actions;

export const selectfindRide = (state: RootState) => state.findRide.planRide;

export default findRideSlice.reducer;
