export const BaseUrl = 'https://ncmsystem.azurewebsites.net'

export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
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
    AddContact: "/api/contacts",
    ViewContact: "/api/contacts",
    UpdateContact: "/api/contacts",
    SearchContact: "/api/contacts/search",
    SetFlag: "/api/contacts/flag",
    SetStatus: "/api/contacts/status",
}

export const TeamAPI = {
    GetTeam: "/api/team",
    ViewContactMember: "/api/team",
}