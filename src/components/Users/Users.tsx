import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";

type PropsType = {
    currentPage: number,
    onPageChanged: (p: number) => void,
    totalUsersCount: number,
    pageSize: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />

            <div>
                {
                    props.users.map(user => <User key={user.id}
                                                  user={user}
                                                  followingInProgress={props.followingInProgress}
                                                  unfollow={props.unfollow}
                                                  follow={props.follow} />)
                }
            </div>
        </div>
    )
};


export default Users;