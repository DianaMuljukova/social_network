import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer"
import Preloader from "../common/Preloader/Preloader";
import {
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        const { requestUsers, currentPage, pageSize } = this.props;
        requestUsers(currentPage, pageSize);
    }
    onPageChanged = (p) => {
        const { requestUsers, pageSize } = this.props;
       requestUsers(p, pageSize);
    };


    render() {

        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};


export default connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
})(UsersContainer);

