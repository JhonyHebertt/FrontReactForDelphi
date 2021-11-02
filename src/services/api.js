import axios from 'axios';

//const api = axios.create({ baseURL: 'http://18.230.70.56:9000' });
const api = axios.create({ baseURL: 'http://localhost:9000' });

//api.defaults.headers.common = { "Authorization": `Bearer ${localStorage.getItem('DelphiReactToken')}` };

api.defaults.headers.common = {

    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Expose-Headers": "*",
    "Authorization": `Bearer ${localStorage.getItem('DelphiReactToken')}`
};

export default api;