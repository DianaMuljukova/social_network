import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from "../../components/common/FormsControls/FormsControls.module.css";



const LoginForm = ({handleSubmit, error}) => {
    return (
            <form onSubmit={handleSubmit}>
                    {createField("email", "email", [required], Input)}
                    {createField("password", "password", [required], Input, {type: "password"})}
                    {createField(null, "rememberMe", [required], Input, {type: "checkbox"}, "Remember me")}
                {
                    error &&
                    <div className={styles.formSummaryError}>
                        {error}
                    </div>
                }
                <div>
                    <button>
                        Login
                    </button>
                </div>
            </form>
    )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        const { email, password, rememberMe } = formData;
        props.login(email, password, rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
};

export default connect(mapStateToProps, {login})(Login);