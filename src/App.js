import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* all children of this AuthContext.Provider will have access to auth context */}
      {/* isloggedin will be passed to all listning components */}
      {/* <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
        }}>  */}
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
