import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Alert, Button} from "antd";

const Header = (props) => {
    return <header className={classes.header}>
        <img className={classes.logo} src="https://www.flaticon.com/svg/static/icons/svg/3428/3428471.svg" alt="logo" />
        <div className={classes.loginBlock}>
            {
                props.isAuth ?
                    <div><div>{props.login}</div><Button onClick={props.logout}>Logout</Button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>
            }

        </div>
    </header>
};

export default Header;