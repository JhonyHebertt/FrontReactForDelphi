import axios from 'axios';

//const api = axios.create({ baseURL: 'http://18.230.70.56:9000' });
const api = axios.create({ baseURL: 'http://localhost:9000' });

//api.defaults.headers.common = { Authorization: `bearer ${localStorage.getItem('DelphiReactToken')}` };


export default api;