import React, { 
    useRef, 
    useEffect, 
    useImperativeHandle
} from "react"
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, ()=> {
        return {
            focus: activate //this function is being "externalized" so instances of this component can use it.
        }
    })

    return (
        //!isValid is not falsey as it starts as null/undefined
        <div className={`${classes.control} ${ 
            props.isValid === false ? classes.invalid : ''
            }`}>
            <label htmlFor={props.id}>
                {props.labelText}
            </label>
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
});

export default Input;
