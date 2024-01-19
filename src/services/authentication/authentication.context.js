import React, { useState, useEffect, createContext } from "react";

import { loginRequest } from "./authentication.service";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((e) => {
        setIsLoading(false);
        setUser(e);
        setError(null);
      })
      .catch((er) => setError(er.message));
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Password do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setError(null);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        setError,
        onLogin,
        onRegister,
        onLogout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
