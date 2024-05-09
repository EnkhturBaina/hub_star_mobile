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

  const [selectedUserType, setSelectedUserType] = useState(null);
  const [selectedSpecialService, setSelectedSpecialService] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState({
    customerType: "",
    mainDirectionId: "",
    directionId: "",
    subDirectionId: "",
    userType: "",
    provinceId: "",
    districtId: "",
    khorooId: "",
    title: "",
    address: "",
    desciption: "",
    price: 0,
    counter: 0,
    email: "",
    phone: "",
    isMessenger: false,
    isTermOfService: false,
  });
  const clearServiceData = () => {
    setServiceData({
      customerType: "",
      mainDirectionId: "",
      directionId: "",
      subDirectionId: "",
      userType: "",
      provinceId: "",
      districtId: "",
      khorooId: "",
      title: "",
      address: "",
      desciption: "",
      price: 0,
      counter: 0,
      email: "",
      phone: "",
      isMessenger: false,
      isTermOfService: false,
    });
  };

  const [serviceParams, setServiceParams] = useState({
    specialService: selectedSpecialService,
    order: "DESC",
    page: 1,
    limit: 10,
    directionIds: null,
    subDirectionIds: null,
  });

  const login = async (email, password, rememberEmail) => {
    setErrorMsg("");
    await axios
      .post(
        `${SERVER_URL}authentication/login`,
        {
          email: email?.toLowerCase(),
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": X_API_KEY,
          },
        }
      )
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
        if (error.response.data.statusCode == 400) {
          setErrorMsg("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
        } else {
          setErrorMsg("Уучлаарай. Сервертэй холбогдоход алдаа гарлаа.");
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
          console.log("=======", user);
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
  };

  const getMainDirection = async () => {
    await axios
      .get(`${SERVER_URL}reference/main-direction`, {
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
        console.error("Error fetching get Main Direction:", error);
      });
  };
  const getDirection = async () => {
    await axios
      .get(`${SERVER_URL}reference/direction`, {
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
        console.error("Error fetching get Direction:", error);
      });
  };
  const getSubDirection = async () => {
    await axios
      .get(`${SERVER_URL}reference/sub-direction`, {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log("get SubDirection response", response);
        setSubDirection(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching get SubDirection:", error);
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

  const addCommas = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const removeNonNumeric = (num) => {
    if (num?.toString().charAt(0) === "0") {
      num = num?.toString().substring(1);
    }
    if (num?.toString().replace(/[^0-9]/g, "") > 500000000) {
      num = num?.slice(0, -1);
    }
    return num?.toString().replace(/[^0-9]/g, "");
  };

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
        serviceData,
        setServiceData,
        clearServiceData,
        setCurrentStep,
        currentStep,
        addCommas,
        removeNonNumeric,
        selectedUserType,
        setSelectedUserType,
        selectedSpecialService,
        setSelectedSpecialService,
        serviceParams,
        setServiceParams,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
