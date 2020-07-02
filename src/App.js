import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderComponent from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";
import store from "./redux/redux-store";
import {WithSuspense} from "./hoc/WithSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));



class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    render() {

        // if (!this.props.initialized) {
        //     return <Preloader/>
        // }

        return (
            <div className="app-wrapper">

                <HeaderComponent />

                <Navbar />

                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to={"/profile"}/>} />
                        <Route exact path="/dialogs" render={ WithSuspense(DialogsContainer)} />
                        <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)} />
                        <Route path="/users" render={() => <UsersContainer />} />
                        <Route path="/login" render={() => <LoginPage />} />
                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.appReducer.initialized
    }
};

let AppContainer =  compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

let SamuraiJSApp = props => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
};

export default SamuraiJSApp;
