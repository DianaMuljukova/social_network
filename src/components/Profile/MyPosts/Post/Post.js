import React from "react";
import classes from './Post.module.css';

const Post = props => {

    return <div className={classes.item}>
        <img src="https://icdn.lenta.ru/images/2020/01/28/17/20200128170822958/square_320_9146846fb3b1bfae5672755bc1896214.jpg" alt="user"/>
        {props.message}
        <div>
            <span>like</span>
        </div>

    </div>


};

export default Post;