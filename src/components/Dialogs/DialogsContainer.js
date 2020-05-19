import React from "react";
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { updateMessageActionCreator, addNewMessageActionCreator } from "../../redux/dialogs-reducer";

const Dialogs = (props) => {

    const onMessageChange = e => {
        let value = e.target.value;
        props.dispatch(updateMessageActionCreator(value))
    };

    const addMessage = () => {
      props.dispatch(addNewMessageActionCreator())
    };



    let dialogsElements = props.state.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} />);

    let messagesElements = props.state.messages.map((message) => <Message message={message.message} />);


    return (
        <>
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
            <div>
                <textarea onChange={onMessageChange} value={props.state.newMessageBody}></textarea>
            </div>
            <div>
                <button onClick={ addMessage }>Add message</button>
            </div>
        </>
    )
};

export default Dialogs;