import axios from 'axios';

const auth = axios.create({ baseURL: 'http://localhost:9000' });

export default auth;