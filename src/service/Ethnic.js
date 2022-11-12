import api from './Api';
import { SERVICE_URL, API_URL } from '../constant/config';

export const apiGetAllEthnic = async() => {
    let url = SERVICE_URL + API_URL.getAllEthnic;
    return await api.get(url);
}