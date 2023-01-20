import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  // approach -- TODO (priority 1)
  // -> fetch user details here
  // -> create function to getUserDetails and updateUserDetails
  // -> and use them throughout the app

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  let sharedState = {
    wait,
    storeToLocal: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getFromLocal: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
    console: (value) => {
      console.log(value);
      return;
    },
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
