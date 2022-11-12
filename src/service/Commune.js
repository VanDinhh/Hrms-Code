import api from './Api';
import { SERVICE_URL, API_URL } from '../constant/config';

export const apiGetAllCommune = async() => {
    let url = SERVICE_URL + API_URL.getAllCommune;
    return await api.get(url);
}
