import api from './Api';
import { SERVICE_URL, API_URL } from '../constant/config';

export const apiGetAllDistrict = async() => {
    let url = SERVICE_URL + API_URL.getAllDistrict;
    return await api.get(url);
}