import request from '@/utils/request'

export function login(data: any){
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function saveUser(data: any){
    return request({
        url: '/user/update',
        method: 'post',
        data: data
    })
}

export function getCurrentUser(){
    return request({
        url: '/user/getCurrentUser',
        method: 'get'
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

export function getFriendById(id:string){
    return request({
        url:'/user/getFriend/'+id,
        method: 'get',
    })
}

export function getUserinfo(id:string){
    return request({
        url: '/user/getUserInfo/'+id,
        method: 'get',
    })
}
