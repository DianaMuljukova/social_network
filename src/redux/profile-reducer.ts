import {FormAction, stopSubmit} from "redux-form";
import {PostsType, ProfileType, PhotosType} from "../types/types";
import {profileApi} from "../api/profile-api";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12},
        { id: 2, message: "It's my first post", likesCount: 11},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }

        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (newPost: string) => ({type: 'ADD_POST', newPost} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    deletePos: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
};

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>


export const setProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileApi.setProfile(userId);
        dispatch(actions.setUserProfile(response))
    }
};

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);
        dispatch(actions.setStatus(response))
    }
};

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileApi.updateStatus(status);
            if (response.resultCode === 0) {
                dispatch(actions.setStatus(status))
            }
        } catch (e) {
            console.log(e)
        }

    }
};

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file);
        if (response.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.photos))
        }
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileApi.saveProfile(profile);
        if (response.resultCode === 0) {
            if (userId !== null) {
                dispatch(setProfile(userId))
            } else {
               throw new Error(`userId can't be null`)
            }
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}));
            //return Promise.reject(response.messages[0]);
        }
    }
};

export default profileReducer;