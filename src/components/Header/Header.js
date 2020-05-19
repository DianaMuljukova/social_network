import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={classes.header}>
        <img className={classes.logo} src="https://www.rundesign.it/wp-content/uploads/2018/10/Tavola-disegno-1@2x.png" alt="logo" />
        <div className={classes.loginBlock}>
            {
                props.isAuth ?
                    <div>{props.login} <button onClick={props.logout}>Logout</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>
            }

        </div>
    </header>
};

export default Header;