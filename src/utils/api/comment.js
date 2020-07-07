import fly from '../request'

export function uploadImg (params) {
    return post('api/0.1/upload/img', params)
}
export function getWater(params) {
    return fly.request({
        url: '/waterList',
        method: 'get',
        body: params
    })
}
export function electList(params) {
    return fly.request({
        url: '/electList',
        method: 'get',
        body: params
    })
}

















