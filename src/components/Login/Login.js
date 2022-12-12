import React, { 
  useState, 
  useEffect, 
  useReducer, 
  useContext, 
  useRef 
} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

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
  //we're using object destructuring to prevent further validations after the fact our email and password are valid.
  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;
  //we do it this way to only grab the email.isvalid and password.isvalid changes. therefore the useEffect will only run
  //when one of these 'isValid's changes. if we're using just 'email' or 'password' every single time email.value and password.value
  //change regardless of wether they're valid or not.
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(()=> {
    //everytime wwe change email or password this timeout will execute, but if we retype 
    //the "return" section will execute first, cancelling the validation and running it again.
    const identifier = setTimeout(()=> {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('Cancelling validation');
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT', 
      val: event.target.value
    });

    // setFormIsValid(event.target.value.includes('@') && password.value.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT', 
      val: event.target.value
    });
  };

  const validateEmailHandler = () => dispatchEmail({type: 'INPUT_BLUR'});

  const validatePasswordHandler = () => dispatchPassword({type: 'INPUT_BLUR'});

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      ctx.onLogin(email.value, password.value);
    } else if(!emailIsValid){
      emailInputRef.current.focus();
    } else { //password is invalid. emailisvalid goes first cuz its the first possibly invalid input
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          labelText='E-Mail'
          type='email'
          isValid={emailIsValid}
          value={email.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />

        <Input 
          ref={passwordInputRef}
          labelText='Password'
          type='password' 
          isValid={passwordIsValid}
          value={password.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
