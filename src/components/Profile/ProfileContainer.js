import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux"
import {getStatus, setProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.setProfile(userId);
        this.props.getStatus(userId)
    };

    render() {
        return(
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     savePhoto={this.props.savePhoto}
                     updateStatus={this.props.updateStatus} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
};


export default compose(
    connect (mapStateToProps, {setProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer);