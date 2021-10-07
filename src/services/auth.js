import axios from 'axios';

const auth = axios.create({ baseURL: 'http://localhost:9005' });

export default auth;