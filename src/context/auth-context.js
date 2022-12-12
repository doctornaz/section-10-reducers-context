//This file is named like this to not confuse it with a component.
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: ()=> {}, //dummy function for VSCode intellisense
    onLogin: (email, password)=> {} //dummy function for VSCode intellisense
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

      //this executes after rendering
    useEffect(()=> {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        
        if (storedUserLoggedInInformation === '1'){
        setIsLoggedIn(true);
        }
    },[]); //if second param (dependencies) is empty this code will execute only once

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler,
        onLogin: loginHandler}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;