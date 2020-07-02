
const SEND_MESSAGE = 'ADD_MESSAGE';

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

const dialogReducer = (state = initialState, action: any): InitialStateType => {



    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: action.newMessageBody}],
            };
        }
        default:
            return state;
    }
};

type addNewMessageActionCreatorActionType ={
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const addNewMessageActionCreator = (newMessageBody: string): addNewMessageActionCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogReducer;