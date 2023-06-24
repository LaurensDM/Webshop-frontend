import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://socket.dws.qwict.com';
const URL = process.env.NODE_ENV === 'production' ? 'https://socket.dws.qwict.com' : 'http://localhost:9001';
// const URL = 'https://socket.dws.qwict.com';

export const socket = io(URL, {
  withCredentials: true,
  transports: ['polling'],
});