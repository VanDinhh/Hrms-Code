import api from './Api';
import { SERVICE_URL, API_URL } from '../constant/config';

export const apiGetAllCity = async() => {
    let url = SERVICE_URL + API_URL.getAllCity;
    return await api.get(url);
}