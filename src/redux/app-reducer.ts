import {getAuthUserData} from "./auth-reducer";
import {InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
};

type ActionsType = InferActionsType<typeof actions>

export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SET_INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess: () => ({type: 'SET_INITIALIZED_SUCCESS'} as const)
};

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess())
        });
    }
};



export default appReducer;