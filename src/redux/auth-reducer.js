import {authApi, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
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

export const setUserData = (login, userId, email, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, data: {captchaUrl}});

export const getAuthUserData = () => {
    return (dispatch) => {
        return authApi.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {login, id, email } = data.data;
                    dispatch(setUserData(login, id, email, true))
                }
            });
    }
};

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe, captcha);
        if (response.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.messages.length > 0 ? response.messages[0] : "Some error";
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
};

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const response = await securityApi.getCaptchaUrl();
        const captchaUrl = response.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }
};

export const logout = () => {
    return async (dispatch) => {
        let response = await authApi.logout();
        if (response.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
};


export default authReducer;