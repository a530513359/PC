import ajaxRequest from './ajaxRequest'

export function GetPersonList(billno) {
    return ajaxRequest({
        method: 'get',
        url: 'values/GetOrcleList',
        params: {
            billno: billno
        }
    })
}

export function FormPostTbill(obj) {
    return ajaxRequest({
        method: 'post',
        url: 'values/ToPostTbill',
        data:JSON.stringify(obj)
    })
}

