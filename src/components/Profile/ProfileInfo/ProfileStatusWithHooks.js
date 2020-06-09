import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = props => {

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(props.status);

   useEffect(() => {
       setStatus(props.status);
   },[props.status]);

   const activateEditMode = () => {
       setEditMode(true);
    };

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = e => {
        setStatus(e.target.value);
        setStatus(e.target.value);
    };
        return (
            <div>
                { !editMode &&
                <div>
                   <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || 'no-status'}</span>
                </div>
                }

                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} type="text" onBlur={deActivateEditMode} value={status}/>
                </div>
                }
            </div>
        );
};

export default ProfileStatusWithHooks;