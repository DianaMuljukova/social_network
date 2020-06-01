import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";



let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {

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