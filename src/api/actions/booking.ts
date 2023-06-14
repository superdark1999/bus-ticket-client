import axiosClient, { isLocalHost } from 'api/apiClient';
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
    const url = isLocalHost() ? 'http://localhost:8082/graphql' : 'http://www.busticket.net.eu.org/graphql';

    const response = await axios.post(url, { query, variables });
    return response.data.data.addTicket;
  } catch (error) {
    console.log('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
    throw new Error('Create failed!');
  }
};

export interface ITicket {
  bookingDate: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  seatNumber: number;
  status: string;
  tripRoute_id: string;
  _id: string;
}

const getTicketsByEmailOrPhone = async (email?: string, phone?: string): Promise<ITicket[]> => {
  // eslint-disable-next-line @typescript-eslint/naming-convention

  try {
    const query = `
    query Tickets($tripRoute_id: String, $customerPhone: String, $customerEmail: String) {
        tickets(tripRoute_id: $tripRoute_id, customerPhone: $customerPhone, customerEmail: $customerEmail) {
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
      customerPhone: phone || null,
      customerEmail: email || null,
      tripRoute_id: null,
    };

    const url = isLocalHost() ? 'http://localhost:8082/graphql' : 'http://www.busticket.net.eu.org/graphql';

    const response = await axios.post(url, { query, variables });
    const tickets: ITicket[] = [...response.data.data.tickets];
    return tickets;
  } catch (error) {
    console.log('🚀 ~ file: trip.ts ~ line 77 ~ createTrip ~ error', error);
    throw new Error('Create failed!');
  }
};

const bookingApi = {
  createTripRoute,
  getTicketsByEmailOrPhone,
};

export default bookingApi;
