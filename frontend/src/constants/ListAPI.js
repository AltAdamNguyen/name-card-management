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

export const GroupContactAPI = {
    ViewGroupContact: "/api/groups",
    AddGroupContact: "/api/groups/add-group",
    DeactiveContact: "/api/contacts/de-active",
    ReactiveContact: "/api/contacts/active",
    ListDeactive: "/api/contacts/de-active",
    ViewGroupContactDetail: "/api/groups",
    DeleteGroupContact: "/api/groups/delete-groupcontact",
    SearchContactInGroup: "/api/groups/search-contactingroupcontact"
}

export const TeamAPI = {
    GetTeam: "/api/team",
    ViewContactMember: "/api/team",
    SearchMember: "/api/team/search"
}