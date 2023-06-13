export const BASE_URL = () => {
  const originUrl = window.location.origin;

  if (originUrl?.includes('localhost'))
    return {
      adminTrip: 'http://localhost:8081/trip', // resful API
      adminTripRoute: 'http://localhost:8085/trip-route',
      adminCoach: 'http://localhost:8083',
      user: '',
      booking: '',
    };

  return {
    adminTrip: 'http://www.busticket.net.eu.org//trip', // resful API
    adminTripRoute: 'http://www.busticket.net.eu.org/trip-route',
    adminCoach: 'http://www.busticket.net.eu.org',
    user: '',
    booking: '',
  };
};

export default {
  BASE_URL,
};
