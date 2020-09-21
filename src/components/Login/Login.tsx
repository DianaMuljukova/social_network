import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from "../../components/common/FormsControls/FormsControls.module.css";
import {AppStateType} from "../../redux/redux-store";
import { Button } from "antd";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                    {createField<LoginFormValuesTypeKeys>("email", 'email', [required], Input)}
                    {createField<LoginFormValuesTypeKeys>("password", "password", [required], Input, {type: "password"})}
                    {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [required], Input, {type: "checkbox"}, "Remember me")}

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}
                {
                    error &&
                    <div className={styles.formSummaryError}>
                        {error}
                    </div>
                }
                <div>
                    <Button>
                        Login
                    </Button>
                </div>
            </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type MapStateToPropsType = {
    captchaUrl: string | null,
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: any) => {
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
};

export default connect(mapStateToProps, {login})(Login);