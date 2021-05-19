import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.REACT_APP_AUTH_KEY,
    }
});

export default instance; //zaciągnięty w Login.js jako axios