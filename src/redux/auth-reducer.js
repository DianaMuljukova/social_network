const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    newMessageBody: '',
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
        case UPDATE_NEW_MESSAGE_BODY: {
            return {...state, newMessageBody: action.message};
        }
        case SEND_MESSAGE: {
            return {...state, messages: [...state.messages, { id: 3, message: state.newMessageBody}], newMessageBody: ''};
        }
        default:
            return state;
    }
};

export const updateMessageActionCreator = (message) => ({type: UPDATE_NEW_MESSAGE_BODY, message: message});

export const addNewMessageActionCreator = () => ({type: SEND_MESSAGE});

export default dialogReducer;