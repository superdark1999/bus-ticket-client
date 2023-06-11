import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'state';
import { TripRouteData } from 'views/Admin/tabs/TripRoute';
import { ICityLocation } from 'utils/appData';
import { fetchAllTripRoutes } from './action';

export const TRIP_ROUTE_SLICE_NAME = 'tripRoute';
interface TripRoutState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  tripRoutes: TripRouteData[];
  locationData: ICityLocation[];
}

const initialState = {
  loading: 'idle',
  tripRoutes: [],
  locationData: [],
} as TripRoutState;

export const userSlice = createSlice({
  name: TRIP_ROUTE_SLICE_NAME,
  initialState,
  reducers: {
    setTripRoutes: (state, action) => {
      state.tripRoutes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTripRoutes.pending, (state) => {
        if (state.loading === 'idle') state.loading = 'pending';
      })
      .addCase(fetchAllTripRoutes.fulfilled, (state, action) => {
        const { locationData, tripRoutes } = action.payload;
        state.tripRoutes = tripRoutes;
        state.locationData = locationData;
        state.loading = 'succeeded';
      });
  },
});

export const appSelector = (state: AppState) => state.app;

export default userSlice.reducer;
