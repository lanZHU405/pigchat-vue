import request from '@/utils/request'
import { Talk } from '@/types/AllType'

export function saveMessage(data: Talk){
    return request({
        url: '/talk/sendMessage',
        method: 'post',
        data: data
    })
}

export function getMessageData(data: Talk){
    return request({
        url: '/talk/getMessageData',
        method: 'post',
        data: data
    })
}


