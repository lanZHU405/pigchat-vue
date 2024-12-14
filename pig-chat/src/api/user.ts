import request from '@/utils/request'

export function login(data: any){
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function logout(){
    return request({
        url: '/user/logout',
        method: 'post',
    })
}

export function list(type:string){
    return request({
        url:'/'+type+'/list',
        method: 'get',
    })
}

