import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-axios-app.firebaseio.com/'
});

export default instance;
