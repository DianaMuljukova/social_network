
const SEND_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: "Hi"},
        { id: 2, message: "How are you"},
    ],
    dialogs: [
        { id: 1, name: "Diana"},
        { id: 2, name: "Svyatoslav"},
    ],
};

const dialogReducer = (state = initialState, action) => {



    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, { id: 3, message: action.newMessageBody}]
            };
        }
        default:
            return state;
    }
};


export const addNewMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogReducer;