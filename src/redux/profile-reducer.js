import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12},
        { id: 2, message: "It's my first post", likesCount: 11},
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPost,
                likesCount: 1
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: [state.posts.filter(p => p.id !== action.postId)]
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const setProfile = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.setProfile(userId);
        dispatch(setUserProfile(response))
    }
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);
        dispatch(setStatus(response))
    }
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileApi.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
};

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos))
        }
    }
};

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileApi.saveProfile(profile);
        if (response.resultCode === 0) {
            dispatch(setProfile(userId))
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}));
            //return Promise.reject(response.messages[0]);
        }
    }
};

export default profileReducer;