import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { X_API_KEY, SERVER_URL } from "../constant";

const MainContext = React.createContext();

export const MainStore = (props) => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIntroShow, setIsIntroShow] = useState(true);
  const [remember, setRemember] = useState(false);
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState(null);

  const [customerTypes, setCustomerTypes] = useState(null);

  const [directionLoading, setDirectionLoading] = useState(true);
  const [mainDirection, setMainDirection] = useState([]);
  const [direction, setDirection] = useState([]);
  const [subDirection, setSubDirection] = useState([]);

  const [custTypeData, setCustTypeData] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  var date = new Date();

  const login = async (email, password, rememberEmail) => {
    setErrorMsg("");
    await axios({
      method: "post",
      url: `${SERVER_URL}authentication/login`,
      data: {
        email: email?.toLowerCase(),
        password,
      },
      headers: {
        "X-API-KEY": X_API_KEY,
      },
    })
      .then(async (response) => {
        // console.log("response login", response.data);
        if (response.data) {
          await AsyncStorage.setItem("password", password);
          setIsLoading(true);
          setUserData(response.data?.response?.user);

          setToken(response.data?.response?.accessToken);
          setEmail(response.data?.response?.user?.email);
          setUserId(response.data?.response?.user?.id);
          setLastName(response.data?.response?.user?.lastName);
          setFirstName(response.data?.response?.user?.firstName);
          setPhone(response.data?.response?.user?.phone);
          // setEndDate(response.data?.endDate);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({
              accessToken: response.data?.response?.accessToken,
              email,
              id: response.data?.response?.user?.id,
              firstName: response.data?.response?.user?.firstName,
              lastName: response.data?.response?.user?.lastName,
              phone: response.data?.response?.user?.phone,
              // endDate: response.data?.endDate,
            })
          );
          if (rememberEmail) {
            //Нэвтрэх нэр сануулах CHECK хийсэн үед тухайн утсан дээр EMAIL хагалах
            await AsyncStorage.setItem("login_email", email);
          } else {
            //Нэвтрэх нэр сануулах UNCHECK хийсэн үед тухайн утсан дээрээс EMAIL устгах
            await AsyncStorage.removeItem("login_email");
          }
          // if (!response.data?.user?.is_active) {
          //   setShowPromoDialog(true);
          // }
          setIsLoggedIn(true);
        }
      })
      .catch(function (error) {
        setIsLoggedIn(false);
        console.log("error2", error.response.data);
        setErrorMsg("Уучлаарай. Сервертэй холбогдоход алдаа гарлаа.");
        if (error.response.data.statusCode == 400) {
          setErrorMsg("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // AsyncStorage.clear();
  const logout = async (type) => {
    setIsLoading(true);
    await AsyncStorage.removeItem("user");
    setToken(null);
    setEmail(null);
    setUserId(null);
    setErrorMsg("");

    setIsLoading(false);
    setIsLoggedIn(false);
  };

  const checkUserData = async () => {
    await AsyncStorage.getItem("user")
      .then((data) => {
        if (data !== null) {
          const user = JSON.parse(data);
          // console.log("=======", user);
          setUserData(user);
          setToken(user.accessToken);
          setEmail(user.email);
          setUserId(user.id);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhone(user.phone);
          setIsLoading(false);
          setIsLoggedIn(true);
        } else {
          setIsLoading(false);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        // console.log("ERROR checkUser Data******** : " + err.message);
      });
    getCustomerTypes();
  };
  const getCustomerTypes = async () => {
    await axios({
      method: "get",
      url: `${SERVER_URL}reference/category`,
      headers: {
        "X-API-KEY": X_API_KEY,
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
        "X-API-KEY": X_API_KEY,
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
        "X-API-KEY": X_API_KEY,
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
        "X-API-KEY": X_API_KEY,
      },
    })
      .then((response) => {
        // console.log("get SubDirection response", response);
        setSubDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  useEffect(() => {
    checkUserData();
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
        phone,
        setPhone,
        customerTypes,
        mainDirection,
        direction,
        subDirection,
        custTypeData,
        selectedService,
        setSelectedService,
        errorMsg,
        email,
        firstName,
        lastName,
        setEmail,
        setFirstName,
        setLastName,
        userId,
        userData,
        setUserData,
        token,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
