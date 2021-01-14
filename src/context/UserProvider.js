import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import UserService from 'services/UserService';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * If User Token is saved in localStorage then @UserService
   * has access to to it and bootstrap returns logged in user
   * ReactDOM.unstable_batchedUpdates updates component only once,
   * regardless that state changed 3 times
   */
  const checkTokenAndLoginIfValid = () => {
    return UserService.bootstrap()
      .then((res) => {
        ReactDOM.unstable_batchedUpdates(() => {
          setUser(res.user);
          setAuth(true);
          setLoading(false);
        });
      })
      .catch(() => {
        setLoading(false);
        logOut();
      });
  };

  /**
   * When user authenticated check if token is valid and save or logout user
   */
  const userAuthenticated = () => {
    return checkTokenAndLoginIfValid();
  };

  /**
   * Call Service Logout and reset state to default
   */
  const logOut = () => {
    UserService.logOut();
    ReactDOM.unstable_batchedUpdates(() => {
      setUser({});
      setAuth(false);
    });
  };

  /**
   * Runs only when app is bootstrapped to auth old user or run logout
   * if token is invalid or corrupted
   */
  useEffect(() => {
    checkTokenAndLoginIfValid();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{
        auth,
        user,
        loading,
        logOut,
        userAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;
