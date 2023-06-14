import axios from 'axios';
import qs from 'qs';

const createPayment = (amount: number) =>
  axios.post(
    'http://www.busticket.net.eu.org/create_payment_url',
    qs.stringify({
      amount,
      bankCode: '',
      language: 'vn',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
export default createPayment;
