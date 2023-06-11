import { createAsyncThunk } from '@reduxjs/toolkit';
import tripRouteAPI from 'api/actions/tripRouteAPI';
import { LocationCommon } from 'utils/appData';
import { TripRouteData } from 'views/Admin/tabs/TripRoute';

const baseRoute = '/auth';
const actions = {
  fetchAllTripRoutes: '/fetchAllTripRoutes',
};

Object.keys(actions).forEach((key) => {
  actions[key as keyof typeof actions] = baseRoute + actions[key as keyof typeof actions];
});

export const fetchAllTripRoutes = createAsyncThunk(actions.fetchAllTripRoutes, async () => {
  const tripRoutes: TripRouteData[] = await tripRouteAPI.getTripRouteList();
  const locationData = await LocationCommon.getLocationData();
  return { tripRoutes, locationData };
});
export default '';
