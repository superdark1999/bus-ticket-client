import axios from 'axios';
import qs from 'qs';

const createPayment = (amount: number) =>
  axios.post(
    'http://localhost:8086/create_payment_url',
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
