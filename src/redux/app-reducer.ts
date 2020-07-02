import {getAuthUserData} from "./auth-reducer";
import exp from "constants";

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';


export type InitialState = {
    initialized: boolean
}

let initialState: InitialState = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialState => {

    switch (action.type) {
        case SET_INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: SET_INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        });
    }
};



export default appReducer;