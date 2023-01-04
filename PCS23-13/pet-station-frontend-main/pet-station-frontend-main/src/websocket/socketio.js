// importing libraries
import { io } from 'socket.io-client';

const username = localStorage.getItem('userId');

const URL = `https://petstation.onrender.com?username=${username}`;
const socket = io(URL, { autoConnect: false });

export default socket;
