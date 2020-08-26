import ajaxRequest from './ajaxRequest'
export function WebGetProjectList(pageIndex,limit) {
    return ajaxRequest({
        method: 'get',
        url: 'project/GetprojectList',
        params:{
            pageIndex:pageIndex,
            limit:limit
        }
    })

}

export function WebGetProjectList1(pId) {
    return ajaxRequest({
        method: 'get',
        url: 'project/GetprojectList1',
        params:{pId:pId}
    })

}