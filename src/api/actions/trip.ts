import axiosAdmin from 'api/apiAdmin';
import { createPageOption } from 'api/utils/common';
import { ITrip } from 'views/Admin/tabs/Trip';

const { axiosAdminTrip } = axiosAdmin;

// router.get("/", tripController.list);
// router.get("/:id", tripController.getById);
// router.post("/", tripController.createTrip);
// router.put("/:id", tripController.updateTrip);
// router.delete("/:id", tripController.deletedTrip);

interface TripListResult {
  results: ITrip[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
const ERROR_DATA: TripListResult = {
  results: [],
  page: 0,
  limit: 0,
  totalPages: 0,
  totalResults: 0,
};

const getListTrip = async (
  page: number,
  pageSize: number,
  // sortBy?: string
): Promise<TripListResult> => {
  try {
    const response = await axiosAdminTrip.get('/', {
      params: createPageOption(page, pageSize, 'creatAt'),
    });
    return response.data;
  } catch (error) {
    console.log('getListTrip error', error);
  }
  return { ...ERROR_DATA };
};

const createTrip = async (data: ITrip): Promise<ITrip> => {
  const { destination, duration, origin, price } = data;
  try {
    const response = await axiosAdminTrip.post('/', {
      destination,
      duration,
      origin,
      price,
    });
    return response.data;
  } catch (error) {
    console.error('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
  }
  throw new Error('Create failed!');
};

const updateTrip = async (id: string, dataUpdate: { [key: string]: any }): Promise<ITrip> => {
  try {
    const response = await axiosAdminTrip.put(`/${id}`, dataUpdate);
    return response.data;
  } catch (error) {
    console.error('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
  }
  throw new Error('Update failed!');
};

const deleteTrip = async (id: string): Promise<string> => {
  try {
    const response = await axiosAdminTrip.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('🚀 ~ file: trip.ts ~ line 78 ~ deleteTrip ~ error', error);
  }
  return 'Delete failed!';
};

const adminTripApi = {
  getListTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
export default adminTripApi;
