import api from './Api'
import { SERVICE_URL } from '../constant/config'

export const apiSignIn = async(data) => {
    let url = SERVICE_URL + '/auth/signIn';
    let res;
    res = await api.post(url, data);
    return res;
}