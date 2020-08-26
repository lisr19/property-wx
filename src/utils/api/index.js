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
export function delBs(params) {
    return fly.request({
        url: 'baoshi/bslist',
        method: 'get',
        body: params
    })
}
//仓库
export function getwpList(params) {
    return fly.request({
        url: 'cangku/ckwp',
        method: 'get',
        body: params
    })
}
//外派
export function getwpjl(params) {
    return fly.request({
        url: 'waipai/wpjl',
        method: 'get',
        body: params
    })
}






















