import api from './Api'
import { SERVICE_URL, API_URL } from '../constant/config'

export const apiGetAllEmployee = async() => {
    let url = SERVICE_URL + API_URL.getAllEmployee;
    return await api.get(url);
}

export const apiGetEmployeeByEmployeeId = async(empId) => {
    let url = SERVICE_URL + API_URL.getEmployeeByEmployeeId + `?empId=${empId}`;
    return await api.get(url);
}

export const apiUpdateInformationEmployee = async(empId, data) => {
    let url = SERVICE_URL + API_URL.updateInformationEmployee + `?empId=${empId}`;
    return await api.post(url, data);
}

export const apiInsertInformationEmployee = async(data) => {
    let url = SERVICE_URL + API_URL.insertInformationEmployee;
    return await api.post(url, data);
}

export const apiDeleteEmployee = async(empId) => {
    let url = SERVICE_URL + API_URL.deleteEmployee + `?empId${empId}`;
    return await api.post(url, data);
}