import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/types";
import {AppStateType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

let initialState = {
    users: [] as Array<UsersType>,
    newPostText: '',
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'FOLLOW':
            return  {...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };

        case 'UNFOLLOW':
            return  {...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case 'SET_USERS':
            return {...state, users: action.users};
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalCount};
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    }
};

type ActionsTypes = InferActionsType<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users:  Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
};



type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let response = await usersApi.getUsers(page, pageSize);
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUsersCount(response.totalCount));
        dispatch(actions.toggleIsFetching(false));
    }
};

const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                  actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.followUser.bind(usersApi), actions.followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.unFollowUser.bind(usersApi), actions.unfollowSuccess);
    }
};

export default userReducer;