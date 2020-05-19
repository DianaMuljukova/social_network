import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {Route, withRouter} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderComponent from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        console.log(this.props.initialized);
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">

                <HeaderComponent />

                <Navbar />

                <div className="app-wrapper-content">
                    <Route exact path="/dialogs" render={() => <DialogsContainer />} />
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/login" render={() => <LoginPage />} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.appReducer.initialized
    }
}

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
