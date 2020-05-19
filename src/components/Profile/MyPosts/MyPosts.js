import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPosts = props => {

    let postsElements = props.posts.map((post) => <Post message={post.message} likesCount={post.likesCount} />);


    const addNewPost = values => {
        props.addPost(values.newPost)
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>

            <AddPostFormRedux onSubmit={addNewPost} />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const AddPostForm = props => {


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newPost"
                       placeholder="Add new post"
                       validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const AddPostFormRedux = reduxForm({form: 'addPostForm'})(AddPostForm);

export default MyPosts;