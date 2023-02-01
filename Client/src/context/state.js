import { createContext, useContext, useEffect, useState } from "react";
import { API_PATH } from "../Path";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [labelArr, setLabelArr] = useState([]);
  const [userID, setUserID] = useState("a038c272-c533-44d0-896c-a684974b4231");
  // TODO: setup create new user function
  // two methods
  // one with local storage -> for guest login
  // one with google auth integration -> for actual sign/login

  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  // --> approach for guest login
  // - when user click on btn
  // - check if userId is on LS
  // - if yes then fetchUser and move to dashboard
  // - if no then fire a request to create user
  // - and create a user with guest name
  // - after new user creation, store its userId in LS
  // - and use it for future logins
  // - for logout simply kill the userId in LS

  const fetchUser = async (id) => {
    const res = await fetch(`${API_PATH}/user/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchExpense = async (id) => {
    const res = await fetch(`${API_PATH}/expense/${id}`);
    const data = await res.json();
    return data;
  };

  // const fetchLabel = async (id) => {
  //   const res = id
  //     ? await fetch(`${API_PATH}/label/${id}`)
  //     : await fetch(`${API_PATH}/label`);
  //   const data = await res.json();
  //   return data;
  // };

  const getLabelColor = (item) => {
    let value = "";

    for (let i = 0; i < labelArr.length; i++) {
      const element = labelArr[i];
      if (element.name === item.label) value = element.color;
    }

    return value;
  };

  useEffect(() => {
    const getData = async () => {
      console.log("get data loading");

      // setLoading(true);
      // const data = await fetchUser(userID);
      // console.log(data);
      // const labelData = await fetchLabel();
      // console.log(labelData);
      // setUser(data);
      // setLabelArr(labelData);
      // setLoading(false);
    };

    getData();
  }, []);

  let sharedState = {
    wait,
    userID,
    setUserID,
    user,
    setUser,
    labelArr,
    setLabelArr,

    fetchUser,
    fetchExpense,
    // fetchLabel,
    getLabelColor,

    loadingUser: loading,
    setLoadingUser: setLoading,

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
