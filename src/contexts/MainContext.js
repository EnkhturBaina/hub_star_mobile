import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  var date = new Date();

  useEffect(() => {}, []);

  // AsyncStorage.clear();
  const logout = async (type) => {
    AsyncStorage.getItem("password").then(async (value) => {});
    AsyncStorage.multiRemove(keys).then(() => {
      setIsLoading(false);
      setIsLoggedIn(false);
    });
  };
  return (
    <MainContext.Provider
      value={{
        userId,
        logout,
        isLoading,
        isLoggedIn,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
