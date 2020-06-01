import React from "react";
import classes from './Users.module.css';
import userPhoto from '../../assets/images/avatar-youtube-cat-png-favpng-PRA6iZsrgWAqXFqmjMsfSvuPG.jpg';
import {NavLink} from "react-router-dom";



let Users = ({user, followingInProgress, follow, unfollow, ...props}) => {

    return (
        <div>
            <span>
                <div>
                                <NavLink to={"/profile/" + user.id}>
                                  <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={classes.userPhoto} />
                                </NavLink>
                            </div>
                            <div>

                                {user.followed
                                    ? <button
                                        disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {unfollow(user.id)}}>
                                        Unfollow
                                    </button>
                                    : <button
                                        disabled={followingInProgress.some(id => id === user.id)}
                                        onClick={() => {follow(user.id)}}>
                                        Follow
                                    </button>
                                }

                            </div>
                        </span>

            <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{'user.location.city'}</div>
                                <div>{'user.location.country'}</div>
                            </span>
                        </span>
        </div>
    )
};


export default Users;