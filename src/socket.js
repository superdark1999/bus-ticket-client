import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? 'http://www.busticket.net.eu.org/' : 'http://localhost:3000';
const socket = io('http://localhost:8086');
export default socket;
