import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

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
        authApi.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {login, id, email } = data.data;
                    dispatch(setUserData(login, id, email, true))
                }
            });
    }
};

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authApi.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                    dispatch(stopSubmit('login', {_error: message}))
                }
            });
    }
};

export const logout = () => {
    return (dispatch) => {
        authApi.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false))
                }
            });
    }
};


export default authReducer;