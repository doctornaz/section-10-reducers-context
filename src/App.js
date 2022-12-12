import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //this executes after rendering
  useEffect(()=> {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
    if (storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
    }
  },[]); //if second param (dependencies) is empty this code will execute only once

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };


  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <React.Fragment>
      {/* all children of this AuthContext.Provider will have access to auth context */}
      {/* isloggedin will be passed to all listning components */}
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}> 
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
