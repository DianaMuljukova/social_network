import React from "react";



class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            status: this.props.status
        });
    };

    deActivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = e => {
        this.setState({
            status: e.target.value
        })
    };


    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'no-status'}</span>
                </div>
                }

                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} type="text"
                           onBlur={this.deActivateEditMode} value={this.state.status} />
                </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;