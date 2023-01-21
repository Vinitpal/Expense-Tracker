import { createContext, useContext, useEffect, useState } from "react";
import { API_PATH } from "../Path";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [userID, setUserID] = useState("a038c272-c533-44d0-896c-a684974b4231");
  // TODO: setup create new user function
  // two methods
  // one with local storage
  // one with google auth integration

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  // get userId from local storage
  // if no userId in local then wait for new id generation
  // and in new id generation we will store id to local storage
  // and the step will go back to step 1

  const fetchUser = async () => {
    const res = await fetch(`${API_PATH}/user/${userID}`);
    const data = await res.json();
    return data;
  };

  const fetchExpense = async (id) => {
    const res = await fetch(`${API_PATH}/expense/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const data = await fetchUser();
      console.log(data);

      setUser(data);
      setLoading(false);
    };

    getData();
  }, []);

  let sharedState = {
    wait,
    userID,
    user,
    setUser,

    fetchUser,
    fetchExpense,

    loadingUser: loading,
    setoadingUser: setLoading,

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
