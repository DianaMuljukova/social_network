import {instance, LoginResponseType, APIResponseType, MeResponseType, ResultCodesForCaptcha, ResultCodeEnum} from "./api";

export const authApi = {
    me() {
        return instance.get<APIResponseType<MeResponseType>>(`/auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodesForCaptcha>>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
};