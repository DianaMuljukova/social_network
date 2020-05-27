import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12},
        { id: 2, message: "It's my first post", likesCount: 11},
    ]
};

it('length 5', () => {
    let action = addPostActionCreator("testim");
    let newState = profileReducer(state, action);

   expect(newState.posts.length).toBe(3);
});

it('message = "testim"', () => {
    let action = addPostActionCreator("testim");
    let newState = profileReducer(state, action);

   expect(newState.posts[2].message).toBe("testim");
});

it('length decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});


