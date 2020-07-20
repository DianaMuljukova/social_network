import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: { touched: boolean, error: string },
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({meta : {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {(hasError) && <span>{error}</span>}
        </div>
    )
};


export const Textarea = props => {
    const {input, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
};

export const Input = props => {
    const {input, ...restProps} = props;

    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
};

export const createField = (placeholder: string | null, name: string, validators: Array<FieldValidatorType>,
                            component: string | React.Component | React.FC,
                            props = {}, text = "") => (
    <div>
        <Field placeholder={placeholder}  component={component} name={name} validate={validators} {...props} /> {text}
    </div>
);


