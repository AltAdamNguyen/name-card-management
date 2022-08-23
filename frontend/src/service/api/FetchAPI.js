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
            if (response.ok) {
                return response.json()
                    .then((data) => {
                        callback(true, data)
                    })
            }else {
                return response.json()
                    .then((data) => {
                        callback(false, data)
                    })
            }         
        })       
        .catch((error) => {
            callback(false,null)
        })
}

const RefeshToken = async (refresh_token) => {
    console.log("refesh token")
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
    console.log('response', response)
    if (!response.ok) {
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('refresh_token')
        return null
    }
    if(response.ok) {
        let data = await response.json()
        console.log('data', data)
        await SecureStore.setItemAsync('access_token', data.data.access_token)
        return data
    }   
    
}

export const FetchApi = async (url, method, contentType, param, callback) => {
    let refresh_token = await SecureStore.getItemAsync('refresh_token');
    let access_token = await SecureStore.getItemAsync('access_token');
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
                                            callback(true, data)
                                        })
                                }
                            }).catch((error) => {
                                callback(false, null)
                            })
                        }
                        if(data === null) {
                            callback(false, null)
                        }
                    }).catch((err) => {
                        callback(false, null)
                    })
            }
            console.log(response)
            if (response.ok) {
                return response.json()
                    .then((data) => {
                        callback(true, data)
                    })
            }else {
                return response.json()
                    .then((data) => {
                        callback(false, data)
                    })
            }          
        })
        .catch((error) => {
            console.log('error', error)
            callback(false,null)
        })
}
