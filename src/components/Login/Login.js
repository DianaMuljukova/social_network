import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from "../../components/common/FormsControls/FormsControls.module.css";



const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    console.log(captchaUrl);
    return (
            <form onSubmit={handleSubmit}>
                    {createField("email", "email", [required], Input)}
                    {createField("password", "password", [required], Input, {type: "password"})}
                    {createField(null, "rememberMe", [required], Input, {type: "checkbox"}, "Remember me")}

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}
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
        const { email, password, rememberMe, captcha } = formData;
        props.login(email, password, rememberMe, captcha)
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
};

export default connect(mapStateToProps, {login})(Login);