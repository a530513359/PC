import ajaxRequest from './ajaxRequest'

export function WebSreverLogins(params) {
    return ajaxRequest({
        method: 'post',
        url: 'logins/WebSreverLogins',
        data: params
    })
}
export function WebSreverRegisters(params) {
    return ajaxRequest({
        method: "post",
        url: 'logins/WebSreverRegisters',
        data: params
    })
}
export function WebSreverVerifys(LoginPhone) {
    return ajaxRequest({
        method: "get",
        url: `logins/Verifys?LoginPhone=${LoginPhone}`,

    })
}
//页面刷新
export default {
    inject: ['reload'],                                 //注入App里的reload方法
    data() {
        return {

        }
    }
}
