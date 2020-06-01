import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            console.log(action.data);
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

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe);
        if (response.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : "Some error";
            dispatch(stopSubmit('login', {_error: message}))
        }
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