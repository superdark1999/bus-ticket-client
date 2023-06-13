import axiosClient from 'api/apiClient';
import axios from 'axios';

const baseRoute = '/booking';
const subRoutes = {
  searchTicket: '/search-ticket',
  register: '/payment',
};

Object.keys(subRoutes).forEach(
  // eslint-disable-next-line no-return-assign
  (key) => (subRoutes[key as keyof typeof subRoutes] = baseRoute + subRoutes[key as keyof typeof subRoutes]),
);

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const getConfig = async () => {
  try {
    const response = await axiosClient.get(subRoutes.searchTicket);
    return response.data;
  } catch (error) {
    console.log('error getConfig', error);
  }
};

const createTripRoute = async (data: any) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { seatNumberList, tripRoute_id, customerName, customerPhone, customerEmail } = data;
  try {
    const query = `
    mutation AddTicket($seatNumberList: [Int!]!, $tripRoute_id: String!, 
      $customerName: String!, $customerPhone: String!, $customerEmail: String) {
      addTicket(seatNumberList: $seatNumberList, tripRoute_id: $tripRoute_id, 
        customerName: $customerName, customerPhone: $customerPhone, customerEmail: $customerEmail) {
        _id
        seatNumber
        status
        tripRoute_id
        bookingDate
        customerName
        customerPhone
        customerEmail
      }
    }
  `;

    const variables = {
      seatNumberList,
      tripRoute_id,
      customerName,
      customerPhone,
      customerEmail,
    };

    const response = await axios.post('http://www.busticket.net.eu.org/graphql', { query, variables });
    return response.data.data.addTicket;
  } catch (error) {
    console.log('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
    throw new Error('Create failed!');
  }
};

const bookingApi = {
  createTripRoute,
};

export default bookingApi;
