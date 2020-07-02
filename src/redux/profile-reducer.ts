import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostsType, ProfileType, PhotosType} from "../types/types";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12},
        { id: 2, message: "It's my first post", likesCount: 11},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

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
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPost: string
}

export const addPostActionCreator = (newPost: string): AddPostActionCreatorType => ({type: ADD_POST, newPost});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});

type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const setProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileApi.setProfile(userId);
        dispatch(setUserProfile(response))
    }
};

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileApi.getStatus(userId);
        dispatch(setStatus(response))
    }
};

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        try {
            let response = await profileApi.updateStatus(status);
            if (response.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (e) {
           console.log(e)
        }

    }
};

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileApi.savePhoto(file);
        if (response.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.photos))
        }
    }
};

export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
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