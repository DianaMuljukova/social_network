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
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    totalUsersCount: number,
    users: Array<UsersType>,
    pageSize: number,
}

type MapDispatchPropsType = {
    requestUsers: (page: number, pageSize: number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { requestUsers, currentPage, pageSize } = this.props;
        requestUsers(currentPage, pageSize);
    }
    onPageChanged = (p: number) => {
        const { requestUsers, pageSize } = this.props;
       requestUsers(p, pageSize);
    };


    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            { this.props.isFetching ? <Preloader /> : null }
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
})(UsersContainer);

