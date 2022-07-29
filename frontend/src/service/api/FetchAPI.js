import { AuthAPI, BaseUrl, Method, ContentType } from "../../constants/ListAPI";
import * as SecureStore from 'expo-secure-store';


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
            console.log(error + "Hai")
        })
}

const RefeshToken = async (refresh_token) => {
    let response = await fetch(`${BaseUrl}${AuthAPI.RefeshToken}`,
        {
            method: Method.POST,
            headers: {
                'Content-Type': ContentType.JSON,
            },
            body: JSON.stringify({
                refresh_token: refresh_token
            })
        }
    )
    if (!response.ok) {
        console.log('error')
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('refresh_token')
        return null
    }
    let data = await response.json()
    return data
}

export const FetchApi = async (url, method, contentType, param, callback) => {
    console.log(url)
    let refresh_token = await SecureStore.getItemAsync('refresh_token');
    let access_token = await SecureStore.getItemAsync('access_token');
    console.log(access_token)
    fetch(`${BaseUrl}${url}`,
        {
            method: method,
            headers: {
                'Content-Type': contentType,
                'Authorization': 'Bearer ' + access_token,
            },
            body: JSON.stringify(param),
        })
        .then((response) => {
            if (response.status === 401) {
                RefeshToken(refresh_token)
                    .then((data) => {
                        if (data && data.data) {
                            fetch(`${BaseUrl}${url}`, {
                                method: method,
                                headers: {
                                    'Content-Type': contentType,
                                    'Authorization': 'Bearer ' + data.data.access_token,
                                },
                                body: JSON.stringify(param),
                            }).then((response) => {                           
                                if (response.status === 200) {
                                    return response.json()
                                        .then((data) => {
                                            console.log(data)
                                            callback(data)
                                        })
                                }
                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                        if(data === null) {
                            callback(null)
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            }
            if (response.status === 200) {
                return response.json()
                    .then((data) => {
                        console.log(data)
                        callback(data)
                    })
            }
        })
        .catch((error) => {
            console.log(error)
            callback({message : "Internet Error"})
        })
}
