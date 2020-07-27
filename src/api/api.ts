import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c459fe84-9efd-4d0d-ad94-0fc549d7bb06"
    }
});

export type APIResponseType<T = {}, RC = ResultCodeEnum> = {
    data: T,
    messages: Array<string>,
    resultCode: RC,
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export type MeResponseType = {
    id: number, email: string, login: string
};

export type LoginResponseType = {
    userId: number
};

export type GetItemsType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null
}







