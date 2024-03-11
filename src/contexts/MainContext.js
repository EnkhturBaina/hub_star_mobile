import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_KEY, SERVER_URL } from "../constant";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIntroShow, setIsIntroShow] = useState(true);
  const [remember, setRemember] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const [customerTypes, setCustomerTypes] = useState(null);

  const [directionLoading, setDirectionLoading] = useState(true);
  const [mainDirection, setMainDirection] = useState([]);
  const [direction, setDirection] = useState([]);
  const [subDirection, setSubDirection] = useState([]);

  const [custTypeData, setCustTypeData] = useState([]);

  var date = new Date();

  const login = async (mobileNumber, password, remember) => {
    try {
      setIsLoading(true);
      if (remember) {
        //Нэвтрэх нэр сануулах CHECK хийсэн үед тухайн утсан дээр mobileNumber хагалах
        await AsyncStorage.setItem("mobileNumber", mobileNumber);
      }
      // axios({
      //   method: "post",
      //   url: `${DEV_URL}api/login`,
      //   data: {
      //     username: mobileNumber,
      //     password: password,
      //     device_id: expoPushToken,
      //   },
      // })
      //   .then(async (response) => {
      //     // console.log("responee login", response.data);
      //     if (response.data.status == 200) {
      //       setToken(response.data.data?.token);
      //       setCrmCustomerId(response.data.data?.user?.customer_id);
      //       setCrmUserId(response.data.data?.user?.cust_user_id);
      //       setCustomerWithIncome(response.data.data?.user);
      //       setLoginMsg("");
      //       await AsyncStorage.setItem(
      //         "user",
      //         JSON.stringify({
      //           token: response.data.data?.token,
      //           user: response.data.data?.user,
      //           crmCustomerId: response.data.data?.user.customer_id,
      //           crmUserId: response.data.data?.user.cust_user_id,
      //         })
      //       ).then((value) => {
      //         setProfileAndIncome(response.data.data?.user);
      //       });
      //     } else if (response.data.status == 300) {
      //       setIsLoggedIn(false);
      //       setLoginMsg(response.data.message);
      //       setIsLoading(false);
      //     }
      //     setVisibleDialog(true);
      //   })
      //   .catch(function (error) {
      //     if (error.response) {
      //     }
      //   });
    } catch (e) {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };
  // AsyncStorage.clear();
  const logout = async (type) => {
    AsyncStorage.getItem("password").then(async (value) => {});
    AsyncStorage.multiRemove(keys).then(() => {
      setIsLoading(false);
      setIsLoggedIn(false);
    });
  };
  const getCustomerTypes = async () => {
    await axios({
      method: "get",
      url: `${SERVER_URL}reference/category`,
      headers: {
        "X-API-KEY": API_KEY,
      },
    })
      .then((response) => {
        // console.log(
        //   "get Customer Types",
        //   JSON.stringify(response.data.response)
        // );
        setCustomerTypes(response?.data?.response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error getIntro Data status", error.response.status);
          // console.log("error getIntro Data data", error.response.data);
        }
      });
  };

  const getMainDirection = async () => {
    await axios({
      method: "get",
      url: `${SERVER_URL}reference/main-direction`,
      headers: {
        "X-API-KEY": API_KEY,
      },
    })
      .then((response) => {
        // console.log("getMain Direction response", response);
        const result = response.data?.response?.map((item) => {
          return {
            ...item,
            children: direction.filter((el) => el.mainDirectionId === item.id),
          };
        });

        setMainDirection(result);
      })
      .then(() => {
        setDirectionLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getDirection = async () => {
    await axios({
      method: "get",
      url: `${SERVER_URL}reference/main-direction/direction`,
      headers: {
        "X-API-KEY": API_KEY,
      },
    })
      .then((response) => {
        // console.log("get Direction response", response);
        const result = response.data?.response?.map((item) => {
          return {
            ...item,
            sub_children: subDirection.filter(
              (el) => el.directionId === item.id
            ),
          };
        });

        // console.log("get Direction result ===>", result);
        setDirection(result);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  const getSubDirection = async () => {
    await axios({
      method: "get",
      url: `${SERVER_URL}reference/main-direction/direction/sub-direction`,
      headers: {
        "X-API-KEY": API_KEY,
      },
    })
      .then((response) => {
        // console.log("getSubDirection response", response);
        setSubDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  useEffect(() => {
    getCustomerTypes();
    getSubDirection();
  }, []);

  useEffect(() => {
    getDirection();
  }, [subDirection]);

  useEffect(() => {
    getMainDirection();
  }, [direction]);
  return (
    <MainContext.Provider
      value={{
        userId,
        logout,
        isLoading,
        isLoggedIn,
        isIntroShow,
        setIsIntroShow,
        setIsLoggedIn,
        setIsLoading,
        remember,
        setRemember,
        login,
        mobileNumber,
        setMobileNumber,
        customerTypes,
        mainDirection,
        direction,
        subDirection,
        custTypeData,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
