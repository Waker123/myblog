import { request } from '../utils/request'

// 调用测试
export default function getVue2Summary() {
    return request({
        url: '/vue2Summary',//此处为自己请求地址
        method: 'get'
    })
}
