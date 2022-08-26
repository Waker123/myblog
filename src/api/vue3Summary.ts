import { request } from '../utils/request'

// 调用测试
export default function getVue3Summary() {
    return request({
        url: '/vue3Summary',//此处为自己请求地址
        method: 'get'
    })
}
