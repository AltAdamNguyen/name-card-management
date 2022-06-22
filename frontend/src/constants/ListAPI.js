export const BaseUrl = 'https://ncmsystem.azurewebsites.net'

export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export const ContentType = {
    JSON: 'application/json',
}

export const AuthAPI = {
    Login: '/api/auth/login',
    RefeshToken: '/api/auth/refresh-token',
}

export const ContactAPI = {
    Scan: "/api/scan",
    AddContact: "/api/contact/add",
    ViewContact: "/api/contacts",
}