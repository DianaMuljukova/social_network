import {InferActionsType} from "./redux-store";


type MessagesType = {
    id: number,
    message: string
}
type DialogsType = {
    id: number,
    name: string
}

let initialState = {
    messages: [
        { id: 1, message: "Hi"},
        { id: 2, message: "How are you"},
    ] as Array<MessagesType>,
    dialogs: [
        { id: 1, name: "Diana"},
        { id: 2, name: "Svyatoslav"},
    ] as Array<DialogsType>,
};

export type InitialStateType = typeof initialState;

type ActionType = InferActionsType<typeof actions>

export const actions = {
    addNewMessageActionCreator: (newMessageBody: string) => ({type: 'SEND_MESSAGE', newMessageBody} as const)
};

const dialogReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: action.newMessageBody}],
            };
        }
        default:
            return state;
    }
};



export default dialogReducer;