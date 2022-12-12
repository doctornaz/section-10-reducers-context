//This file is named like this to not confuse it with a component.
import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;