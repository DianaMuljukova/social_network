import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hi, how are you?", likesCount: 12},
                { id: 2, message: "It's my first post", likesCount: 11},
            ],
            newPostText: ''
        },
        dialogsPage: {
            newMessageBody: '',
            messages: [
                { id: 1, message: "Hi"},
                { id: 2, message: "How are you"},
            ],
            dialogs: [
                { id: 1, name: "Diana"},
                { id: 2, name: "Svyatoslav"},
            ],
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('rerenderEntireTree')
    },

    getState() {
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
};






export default store;