import React, {useEffect, useReducer, useState} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const MIN_PASSWORD_LENGTH = 7
const USER_INPUT = 'USER_INPUT'
const INPUT_BLUR = 'INPUT_BLUR'

const emailReducer = (prevState, action) => {
    if (action.type === USER_INPUT){
        return {
            value: action.value,
            isValid: action.value.includes("@")
        }
    }
    if (action.type === INPUT_BLUR) {
        return {
            value: prevState.value,
            isValid: prevState.value.includes("@")
        }
    }
    return {
        value: "",
        isValid: false
    }
};
const passwordReducer = (prevState, action) => {
    if (action.type === USER_INPUT){
        return {
            value: action.value,
            isValid: action.value.trim().length > MIN_PASSWORD_LENGTH
        }
    }
    if (action.type === INPUT_BLUR) {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > MIN_PASSWORD_LENGTH
        }
    }
    return {
        value: "",
        isValid: false
    }
};

const Login = (props) => {
    // const [inputEmail, setInputEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [inputPassword, setInputPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatcherEmailState] = useReducer(emailReducer, {value: "", isValid: undefined})
    const [passwordState, dispatcherPasswordState] = useReducer(passwordReducer, {value: "", isValid: undefined})

    // const {isValid: isEmailValid} = emailState
    // const {isValid: isPasswordValid} = passwordState

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('setFormIsValid')
            setFormIsValid(passwordState.isValid && emailState.isValid)
        }, 1000)
        return () => {
            console.log('clearing')
            clearTimeout(timer)
        }

    }, [emailState.isValid, passwordState.isValid])

    const emailChangeHandler = (event) => {
        // setInputEmail(event.target.value);
        dispatcherEmailState({type: USER_INPUT, value: event.target.value})

        // setFormIsValid(emailState && passwordState);
    };

    const passwordChangeHandler = (event) => {
        // setInputPassword(event.target.value);
        dispatcherPasswordState({type: USER_INPUT, value: event.target.value})

        // setFormIsValid(passwordState.isValid && emailState.isValid);
    };

    const validateEmailHandler = () => {
        dispatcherEmailState({type: INPUT_BLUR})
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(inputPassword.trim().length > MIN_PASSWORD_LENGTH);
        dispatcherPasswordState({type: INPUT_BLUR})

    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${styles.control} ${
                        emailState.isValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${styles.control} ${
                        passwordState.isValid ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!formIsValid}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
