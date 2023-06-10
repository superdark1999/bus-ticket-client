import axiosAdmin from "api/apiAdmin";
import { ITripRoute, TripRouteData } from "views/Admin/tabs/TripRoute";

const createTripRoute = async (data: ITripRoute): Promise<ITripRoute> => {
    const { arrivalTime, bookedSeat, departureTime,tripId,coachId: tripRouteId } = data;
    try {
      const response = await axiosAdmin.axiosAdminTripRoute.post('/new-tripRoute', {
        arrivalTime, 
        bookedSeat, 
        departureTime,
        trip_id: tripId,
        coach_id:tripRouteId
      });
      console.log('🚀 ~ file: trip.ts ~ line 70 ~ createTrip ', response);
      const {newTripRoute} = response.data
      return  newTripRoute;
    } catch (error) {
      console.log('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
    }
    throw new Error('Create failed!');
  };

const getTripRouteList = async (): Promise<TripRouteData[]> => {
  const url = '/list-tripRoute';
  const res = await axiosAdmin.axiosAdminTripRoute.get(url);
  const { tripRouteList } = res.data;

  return tripRouteList;
}


export default {
    createTripRoute,
    getTripRouteList
}