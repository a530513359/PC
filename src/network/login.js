import ajaxRequest from './ajaxRequest'

export function WebSreverLogins(params) {
    return ajaxRequest({
        method: 'post',
        url: 'logins/WebSreverLogins',
        data: params
    })

}