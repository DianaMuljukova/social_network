import {authApi, ResultCodeEnum, ResultCodesForCaptcha, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: false,
    captchaUrl: string | null
};

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case  GET_CAPTCHA_URL_SUCCESS:
            {
            return {
                ...state,
                ...action.data,
            };
        }
        default:
            return state;
    }
};

type setUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setUserDataActionPayloadType
}

export const setUserData = (login: string | null, userId: number | null, email: string | null, isAuth: boolean): setUserDataActionType => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});

type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    data: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}});

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        let data = await authApi.me();
        if (data.resultCode === ResultCodeEnum.Success) {
            let {login, id, email } = data.data;
            dispatch(setUserData(login, id, email, true))
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let response = await authApi.login(email, password, rememberMe, captcha);
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (response.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = response.messages.length > 0 ? response.messages[0] : "Some error";
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        const response = await securityApi.getCaptchaUrl();
        const captchaUrl = response.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
};

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authApi.logout();
        if (response.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
};


export default authReducer;