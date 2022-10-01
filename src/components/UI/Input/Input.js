import styles from "./Input.module.css";
import {forwardRef, useImperativeHandle, useRef} from "react";


const Input = (props, ref) => {
    const inputRef = useRef()

    const focus = () => {
        inputRef.current.focus()
    }

    useImperativeHandle(ref, () => {
        return {
            focus: focus
        }
    }, [])

    return (
        <div
            className={`${styles.control} ${
                props.isValid === false ? styles.invalid : ""
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
}

export default forwardRef(Input)