import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
            <div>
                {/*<div>*/}
                {/*    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="content"/>*/}
                {/*</div>*/}
                <div className={classes.descriptionBlock}>
                    <img src={props.profile.photos.large} />
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                    <br/>
                    <span>{props.profile.fullName}</span>
                </div>
            </div>
        )

};

export default ProfileInfo;