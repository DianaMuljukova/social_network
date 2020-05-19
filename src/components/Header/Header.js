import React from "react";
import classes from './Header.module.css';

const Header = () => {
    return <header className={classes.header}>
        <img className={classes.logo} src="https://www.rundesign.it/wp-content/uploads/2018/10/Tavola-disegno-1@2x.png" alt="logo" />
    </header>
};

export default Header;