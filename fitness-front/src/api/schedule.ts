import type { SchedulePosterProps } from '@/pages/schedule/schedule'
import type { AlbumByDateProps, ScheduleInfoType } from '@/pages/scheduleDetail/scheduleDetail'
import { BASE_URL } from './'
import type { File } from "taro-ui/types/image-picker";
import { request } from '@tarojs/taro'
import FormData from '@zlyboy/wx-formdata'
import type { ResponseWrapper } from './'

export const uploadMedias = async (scheduleId: number, medias: File[]) => {
    const form = new FormData()
    form.append('scheduleId', scheduleId)
    medias.forEach(media => form.appendFile('medias', media.url))
    const data = form.getData()
    return await request<ResponseWrapper<Array<{ date: string } & AlbumByDateProps['medias'][0]>>>({
        url: `${BASE_URL}/addMedia`,
        method: 'POST',
        header: {
            'content-type': data.contentType
        },
        data: data.buffer
    })
}

export const getAllSchedule = async (userId: number) => {
    return await request<ResponseWrapper<SchedulePosterProps[]>>({
        url: `${BASE_URL}/getAllSchedule`,
        method: 'GET',
        data: {
            userId
        }
    })
}

export const getMediasOfSchedule = async (scheduleId: number) => {
    return request<ResponseWrapper<AlbumByDateProps[]>>({
        url: `${BASE_URL}/getMediasOfSchedule`,
        method: 'GET',
        data: {
            scheduleId
        }
    })
}

export const getOneScheduleInfo = async (scheduleId: number) => {
    return await request<ResponseWrapper<ScheduleInfoType>>({
        url: `${BASE_URL}/getOneScheduleInfo`,
        method: 'GET',
        data: {
            scheduleId
        }
    })
}


