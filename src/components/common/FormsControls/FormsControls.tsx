import React from "react";
import styles from "./FormsControls.module.css";
import {Field, WrappedFieldsProps} from "redux-form";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";
import {FieldValidatorType} from "../../../utils/validators/validators";
import { Input as AntInput } from 'antd';
const { TextArea } = AntInput;
type FormControlPropsType = any;

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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


export const Textarea: React.FC<WrappedFieldsProps> = props => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <TextArea {...input} {...restProps} />
        </FormControl>
    )
};

export const Input: React.FC<WrappedFieldsProps> = props => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <AntInput {...input} {...restProps} />
        </FormControl>
    )
};

export function createField<T extends string>(placeholder: string | undefined,
                            name: T,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldsProps>,
                            props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} component={component} name={name} validate={validators} {...props} /> {text}
    </div>


}


