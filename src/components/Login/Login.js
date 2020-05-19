import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from "../../components/common/FormsControls/FormsControls.module.css";



const LoginForm = props => {
   // console.log(props);
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field type="text" placeholder="email" component={Input} name={"email"} validate={[required]} />
                </div>
                <div>
                    <Field type="text" placeholder="password"  component={Input} name={"password"} validate={[required]} />
                </div>
                <div>
                    <Field type="checkbox" component={"input"} name={"rememberMe"} />
                    Remember me
                </div>
                {
                    props.error &&
                    <div className={styles.formSummaryError}>
                        {props.error}
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