import api from './Api'
import { SERVICE_URL, API_URL } from '../constant/config'

export const apiGetAllDepartment = async() => {
    let url = SERVICE_URL + API_URL.getAllDepartment;
    return await api.get(url);
}