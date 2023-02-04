import axios from 'axios';

//referencia
//https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8081'
  });

export default instance