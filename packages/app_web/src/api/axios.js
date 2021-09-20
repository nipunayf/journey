import axios from 'axios';

import { BASE_API } from '../utils/constants';

const instance = axios.create({
    baseURL: BASE_API
});

const token = localStorage.getItem('token');
if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;
