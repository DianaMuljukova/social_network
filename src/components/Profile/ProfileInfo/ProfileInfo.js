import React from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
            <div>
                <div className={classes.descriptionBlock}>
                    <img src={props.profile.photos.large} />
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                    <br/>
                    <span>{props.profile.fullName}</span>
                </div>
            </div>
        )

};

export default ProfileInfo;