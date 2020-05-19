import React from "react";
import classes from './Users.module.css';
import userPhoto from '../../assets/images/avatar-youtube-cat-png-favpng-PRA6iZsrgWAqXFqmjMsfSvuPG.jpg';
import {NavLink} from "react-router-dom";
import { usersApi } from "../../api/api";



let Users = props => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => <span
                    onClick={(e) => {props.onPageChanged(p)}}
                    className={props.currentPage === p && classes.selectedPage}
                >{p}</span>)}
            </div>
            {
                props.users.map(user => (
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={"/profile/" + user.id}>
                                  <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={classes.userPhoto} />
                                </NavLink>
                            </div>
                            <div>

                                {user.followed
                                    ? <button
                                        disabled={props.followingInProgress.some(id => id === user.id)}
                                        onClick={() => {props.unfollow(user.id)}}>
                                        Unfollow
                                    </button>
                                    : <button
                                        disabled={props.followingInProgress.some(id => id === user.id)}
                                        onClick={() => {props.follow(user.id)}}>
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
                ))
            }
        </div>
    )
};


export default Users;