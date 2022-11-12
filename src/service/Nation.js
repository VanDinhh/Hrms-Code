import api from './Api';
import { SERVICE_URL, API_URL } from '../constant/config';

export const apiGetAllNation = async() => {
    let url = SERVICE_URL + API_URL.getAllNation;
    return await api.get(url);
}