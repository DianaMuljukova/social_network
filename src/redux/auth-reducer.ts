import {ResultCodeEnum, ResultCodesForCaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string| null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case  'GET_CAPTCHA_URL_SUCCESS':
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

export const actions = {
    setUserData: (login: string | null, userId: number | null, email: string | null, isAuth: boolean) =>
        ({type: 'SET_USER_DATA', data: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl}} as const)
};

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authApi.me();
        if (data.resultCode === ResultCodeEnum.Success) {
            let {login, id, email } = data.data;
            dispatch(actions.setUserData(login, id, email, true))
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
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

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const response = await securityApi.getCaptchaUrl();
        const captchaUrl = response.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    }
};

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.logout();
        if (response.resultCode === 0) {
            dispatch(actions.setUserData(null, null, null, false))
        }
    }
};


export default authReducer;