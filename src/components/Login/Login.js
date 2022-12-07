import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//this goes outside because we are not using any data from the component function.
const emailReducer = (state, actionDispatched) => {
  switch(actionDispatched.type){
    case 'USER_INPUT': //get new val from action dispatched as the action was from user input
      return { value: actionDispatched.val, isValid: actionDispatched.val.includes('@') };
    case 'INPUT_BLUR': //check for current state as this does not dispatch a new value but we can still get current state
      return { value: state.value, isValid: state.value.includes('@') };
    default:
      return { value: '', isValid: false };
  }
};

const passwordReducer = (state, actionDispatched) => {
  switch(actionDispatched.type){
    case 'USER_INPUT': //get new val from action dispatched as the action was from user input
      return { value: actionDispatched.val, isValid: actionDispatched.val.trim().length > 6 };
    case 'INPUT_BLUR': //check for current state as this does not dispatch a new value but we can still get current state
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: '', isValid: false };
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  // const [state, dispatchFn] = useReducer(reducerFunction, initialState, optional: initialStateFunction);
  const [email, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined });
  const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: undefined });

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT', 
      val: event.target.value
    });

    setFormIsValid(event.target.value.includes('@') && password.value.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT', 
      val: event.target.value
    });

    setFormIsValid(
      email.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => dispatchEmail({type: 'INPUT_BLUR'});

  const validatePasswordHandler = () => dispatchPassword({type: 'INPUT_BLUR'});

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // !email.isValid is not falsey as it starts as null/undefined
            email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // !password.isValid is not falsey as it starts as null/undefined
            password.isValid === false ? classes.invalid : '' 
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
