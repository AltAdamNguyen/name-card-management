import { AuthAPI, BaseUrl, Method, ContentType } from "../../constants/ListAPI";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const isTokenExpired = (token) => {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        return true;
    }
    return false;
}

export const FetchApi = async (url, method, contentType, param, callback) => {
    let token = await SecureStore.getItemAsync('access_token');
    if (token && isTokenExpired(token)) {
        let refresh_token = await SecureStore.getItemAsync('refresh_token');
        fetch(`${BaseUrl}${AuthAPI.RefeshToken}`,
            {
                method: Method.POST,
                headers: {
                    'Content-Type': ContentType.JSON,
                },
                body: JSON.stringify({ "refresh_token": refresh_token })
            }
        )
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then(async (data) => {
            console.log(data)
            token = data.data.access_token;
            await SecureStore.setItemAsync('access_token', data.data.access_token)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    fetch(`${BaseUrl}${url}`,
        {
            method: method,
            headers: {
                'Content-Type': contentType,
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(param),
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((data) => {
            callback(data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export const FetchApiAuth = (url, method, contentType, param, callback) => {
    fetch(`${BaseUrl}${url}`,
        {
            method: method,
            headers: {
                'Content-Type': contentType,
            },
            body: JSON.stringify(param),
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((data) => {
            callback(data)
        })
        .catch((error) => {
            console.log(error)
        })
}