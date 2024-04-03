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

interface PlanRideState {
  planRide: RideData[];
}

const initialState: PlanRideState = {
  planRide: []
};

const planRideSlice = createSlice({
  name: 'planRide',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action: PayloadAction<RideData>) => {
      state.planRide = [action.payload];
    },
  },
});

export const { fetchDataSuccess } = planRideSlice.actions;

export const selectPlanRide = (state: RootState) => state.planRide.planRide;

export default planRideSlice.reducer;