import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c459fe84-9efd-4d0d-ad94-0fc549d7bb06"
    }
});

export const usersApi = {
    getUsers (currentPage = 1, pageSize = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data)
    },

    followUser (id: number) {
        return instance.post(`/follow/${id}`)
            .then(response => response.data)
    },

    unFollowUser (id: number) {
        return instance.delete(`/follow/${id}`)
            .then(response => response.data)
    }
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {id: number, email: string, login: string},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};

type LoginResponseType = {
    data: {userId: number},
    resultCode: ResultCodeEnum | ResultCodesForCaptcha,
    messages: Array<string>
};

export const authApi = {
    me () {
        return instance.get<MeResponseType>(`/auth/me`)
            .then(response => response.data)
    },
    login (email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout () {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
};

export const profileApi = {
    setProfile (userId: number)   {
        return instance.get(`/profile/${userId}`)
            .then(response => response.data)
    },
    getStatus (userId: number)   {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus (status: string)   {
        return instance.put(`/profile/status`, {
            status: status
        })
            .then(response => response.data)
    },
    savePhoto (file: any)   {
        let formData = new FormData();
        formData.append("image", file);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile (profile: ProfileType)   {
        return instance.put(`/profile`, profile)
            .then(response => response.data)
    },
};

export const securityApi = {
    getCaptchaUrl ()   {
        return instance.get(`/security/get-captcha-url`)
            .then(response => response.data)
    },
};









