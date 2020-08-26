import fly from '../request'


export function getPlan(params) {
    return fly.request({
        url: 'sebei/sbjh',
        method: 'get',
        body: params
    })
}
//报事管理
export function getbsList(params) {
    return fly.request({
        url: 'baoshi/bslist',
        method: 'get',
        body: params
    })
}
export function getbsAdd(params) {
    return fly.request({
        url: 'baoshi/bsadd',
        method: 'post',
        body: params
    })
}





















