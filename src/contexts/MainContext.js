import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { X_API_KEY, SERVER_URL } from "../constant";
import UserTabData from "../refs/UserTabData";
import SpecialServiceData from "../refs/SpecialServiceData";
import * as FileSystem from "expo-file-system";
import * as Updates from "expo-updates";

const MainContext = React.createContext();

export const MainStore = (props) => {
	const navigation = useNavigation();
	const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
	const [updateAvailable, setUpdateAvailable] = useState(false);

	const [userId, setUserId] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isIntroShow, setIsIntroShow] = useState(true);
	const [remember, setRemember] = useState(false);
	const [phone, setPhone] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [userData, setUserData] = useState(null);
	const [userMainDirID, setUserMainDirID] = useState(null);
	const [advertisement, setAdvertisement] = useState(null);

	const [mainDirection, setMainDirection] = useState([]);
	const [direction, setDirection] = useState([]);

	const [selectedService, setSelectedService] = useState(null);
	const [token, setToken] = useState(null);
	const [email, setEmail] = useState(null);
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");

	const [selectedUserType, setSelectedUserType] = useState(null);
	const [selectedSpecialService, setSelectedSpecialService] = useState(null);

	const [subDirectionData, setSubDirectionData] = useState([]);
	const [notifications, setNotifications] = useState([]);

	const [currentStep, setCurrentStep] = useState(1);
	const [serviceData, setServiceData] = useState({
		customerType: null,
		mainDirectionId: null,
		directionId: null,
		subDirectionId: null,
		userType: null,
		provinceId: null,
		districtId: null,
		khorooId: null,
		title: null,
		address: null,
		desciption: null,
		price: 0,
		counter: null,
		email: null,
		phone: null,
		isMessenger: false,
		isTermOfService: false,
		isAfternoon: false,
		specialService: null,
		productName: null,
		unitAmount: 0,
		packageAmount: 0,
		workerCount: null,
		measurement: null,
		machineryTypeId: null,
		markId: null,
		powerId: null,
		modelId: null,
		fromAddress: null,
		toAddress: null,
		imageIds: []
	});
	const clearServiceData = () => {
		setServiceData({
			customerType: null,
			mainDirectionId: null,
			directionId: null,
			subDirectionId: null,
			userType: null,
			provinceId: null,
			districtId: null,
			khorooId: null,
			title: null,
			address: null,
			desciption: null,
			price: 0,
			counter: null,
			email: null,
			phone: null,
			isMessenger: false,
			isTermOfService: false,
			isAfternoon: false,
			specialService: null,
			productName: null,
			unitAmount: 0,
			packageAmount: 0,
			workerCount: null,
			measurement: null,
			machineryTypeId: null,
			markId: null,
			powerId: null,
			modelId: null,
			fromAddress: null,
			toAddress: null,
			imageIds: []
		});
	};

	const [specialServiceParams, setSpecialServiceParams] = useState({
		specialService: selectedSpecialService,
		order: "DESC",
		page: 1,
		limit: 10,
		directionIds: null,
		subDirectionIds: null
	});

	const [userTypeParam, setUserTypeParam] = useState({
		order: "DESC",
		page: 1,
		limit: 10,
		userType: null,
		mainDirectionId: null,
		directionIds: null,
		subDirectionIds: null
	});

	const [mainDirParams, setMainDirParams] = useState({
		order: "DESC",
		// process: "CREATED",
		page: 1,
		limit: 10,
		userType: null,
		mainDirectionId: null,
		directionIds: null,
		subDirectionIds: null
	});
	useEffect(() => {
		setIsLoading(true);
		checkUserData();
		checkForUpdates();
	}, []);

	const checkForUpdates = async () => {
		setIsCheckingUpdate(true);
		try {
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				setUpdateAvailable(true);
				await Updates.fetchUpdateAsync();
				Updates.reloadAsync(); // This will reload the app to apply the update
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsCheckingUpdate(false);
			getMainDirection();
		}
	};

	const getAllSubDirections = async () => {
		await axios
			.get(`${SERVER_URL}reference/sub-direction`, {
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get SpecialServiceData response", JSON.stringify(response.data.response));
				response.data.response?.map((el) => {
					setSubDirectionData((prevState) => [
						...prevState,
						{
							id: el.id,
							title: el.name,
							mainDirectionId: el.direction?.mainDirectionId,
							directionId: el.directionId
						}
					]);
				});
				getHomeScreenAds();
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Error fetching get SpecialServiceData:", error);
				if (error.response.status == "401") {
					Handle_401();
				}
			});
	};

	const login = async (email, password, rememberEmail) => {
		setErrorMsg("");
		await axios
			.post(
				`${SERVER_URL}authentication/login`,
				{
					email: email?.toLowerCase(),
					password
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-api-key": X_API_KEY
					}
				}
			)
			.then(async (response) => {
				// console.log("response login", response.data);
				if (response.data) {
					await AsyncStorage.setItem("password", password);
					setIsLoading(true);
					setUserData(response.data?.response?.user);

					setUserMainDirID(response.data?.response?.user?.mainDirectionId);
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
							phone: response.data?.response?.user?.phone
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
				// console.log("error2", error.response.data);
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
	const logout = async () => {
		setIsLoading(true);
		try {
			axios
				.post(
					`${SERVER_URL}authentication/logout`,
					{},
					{
						headers: {
							"Content-Type": "application/json",
							"x-api-key": X_API_KEY,
							Authorization: `Bearer ${token}`
						}
					}
				)
				.then(async (response) => {
					// console.log("logout", response.data);
					await AsyncStorage.removeItem("user");
					setToken(null);
					setEmail(null);
					setUserId(null);
					setErrorMsg("");
					setIsLoggedIn(false);
				})
				.catch(function (error) {
					setErrorMsg(error.response?.data?.message);
					if (error.response) {
						console.log("error.response logout", error.response.data);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		} catch (error) {
			// console.log("error", error);
		}
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
					setIsLoggedIn(true);
				} else {
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
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("getMain Direction response", JSON.stringify(response));

				setMainDirection(response.data.response);
				getDirection();
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Error fetching get Main Direction:", error);
				if (error.response.status == "401") {
					Handle_401();
				}
			});
	};

	const getDirection = async () => {
		await axios
			.get(`${SERVER_URL}reference/direction`, {
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("getMain Direction response", JSON.stringify(response));

				setDirection(response.data.response);
				getAllSubDirections();
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Error fetching get Main Direction:", error);
				if (error.response.status == "401") {
					Handle_401();
				}
			});
	};

	const addCommas = (num) => {
		return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const removeNonNumeric = (num) => {
		if (num?.toString().charAt(0) === "0") {
			num = num?.toString()?.substring(1);
		}
		if (num?.toString()?.replace(/[^0-9]/g, "") > 500000000) {
			num = num?.slice(0, -1);
		}
		return num?.toString()?.replace(/[^0-9]/g, "");
	};

	const getTypeName = (userType, specialService, isSlash) => {
		var typeData = null;
		if (userType !== null) {
			typeData = UserTabData.filter((el) => el.type === userType).map(function (obj) {
				return obj.title;
			});
		} else if (specialService !== null) {
			typeData = SpecialServiceData.filter((el) => el.type === specialService).map(function (obj) {
				return obj.title;
			});
		}
		if (isSlash) {
			//Үйлчилгээний дэлгэрэнгүй дотор харагдах
			return typeData[0] ? `${typeData[0]} / ` : null;
		} else {
			//Үйлчилгээнүүд жагсаалтаар харагдах
			return typeData[0] ? typeData[0] : null;
		}
	};

	const Handle_401 = () => {
		setErrorMsg("Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү");
		setIsLoggedIn(false);
	};

	const fileUpload = async (fileUri) => {
		// console.log("fileUri", fileUri);
		try {
			const response = await FileSystem.uploadAsync(`${SERVER_URL}local-files/fileUpload`, fileUri, {
				fieldName: "file",
				httpMethod: "POST",
				uploadType: FileSystem.FileSystemUploadType.MULTIPART
			});
			// console.log("response=>", response?.status);
			// console.log("response=>", response?.body);
			if (response?.status == 200) {
				const data = JSON.parse(response?.body);
				return data;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const saveAd = async (ad_id) => {
		const data = await axios
			.post(
				`${SERVER_URL}advertisement/save/${ad_id}`,
				{},
				{
					headers: {
						"x-api-key": X_API_KEY,
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then((response) => {
				return "Үйлчилгээ амжилттай хадгаллаа";
			})
			.catch((error) => {
				console.log("error", error);
				if (error.response.status == "401") {
					Handle_401();
				}
				// console.error("Error fetching get NewsDTL:", error.response.status);
			});
		return data;
	};

	const handleNotification = async (notification_data) => {
		const data = await axios
			.post(`${SERVER_URL}notification`, notification_data, {
				headers: {
					"x-api-key": X_API_KEY,
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				return "Үйлчилгээ амжилттай захиаллаа";
			})
			.catch((error) => {
				console.log("error", error);
				if (error.response.status == "401") {
					Handle_401();
				}
				// console.error("Error fetching get NewsDTL:", error.response.status);
			});
		return data;
	};
	const getNotifications = async () => {
		await axios
			.get(`${SERVER_URL}notification`, {
				params: {
					authorId: userData?.id
				},
				headers: {
					"x-api-key": X_API_KEY,
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				// console.log("get Notifications ===========>", JSON.stringify(response.data.response));
				setNotifications(response.data.response);
			})
			.catch((error) => {
				console.log("error", error);
				if (error.response.status == "401") {
					Handle_401();
				}
				// console.error("Error fetching get NewsDTL:", error.response.status);
			});
	};

	const createAd = async () => {
		console.log("serviceData", JSON.stringify(serviceData));
		if (serviceData?.id) {
			console.log("EDIT");
			const adResponse = await axios
				.patch(
					`${SERVER_URL}advertisement/${serviceData.id}`,
					{
						...serviceData
					},
					{
						headers: {
							"x-api-key": X_API_KEY,
							Authorization: `Bearer ${token}`
						}
					}
				)
				.then((response) => {
					// console.log("EDIT AD =====>", response.data.response);
					return response;
				})
				.catch((error) => {
					console.log("error response data =>>", error.response.data);
					if (error.response.status == "401") {
						Handle_401();
					}
					// console.error("Error fetching get NewsDTL:", error.response.status);
				});
			return adResponse;
		} else {
			console.log("CREATE");
			const adResponse = await axios
				.post(
					`${SERVER_URL}advertisement`,
					{
						...serviceData
					},
					{
						headers: {
							"x-api-key": X_API_KEY,
							Authorization: `Bearer ${token}`
						}
					}
				)
				.then((response) => {
					// console.log("CREATE AD =====>", response.data.response);
					return response;
				})
				.catch((error) => {
					console.log("error response data =>>", error.response.data);
					if (error.response.status == "401") {
						Handle_401();
					}
					// console.error("Error fetching get NewsDTL:", error.response.status);
				});
			return adResponse;
		}
	};
	const getHomeScreenAds = async () => {
		await axios
			.get(`${SERVER_URL}advertisement`, {
				params: {
					page: 1,
					pageCount: 1,
					hasNextPage: false,
					hasPreviousPage: false,
					itemCount: 1,
					limit: 10
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get DoingServices",
				//   JSON.stringify(response.data.response)
				// );
				setAdvertisement(response.data.response.data);
			})
			.catch((error) => {
				console.error("Error fetching get DoingServices:", error);
				if (error.response.status == "401") {
					Handle_401();
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
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
				specialServiceParams,
				setSpecialServiceParams,
				userMainDirID,
				setUserMainDirID,
				userTypeParam,
				setUserTypeParam,
				mainDirParams,
				setMainDirParams,
				subDirectionData,
				direction,
				getTypeName,
				setErrorMsg,
				Handle_401,
				fileUpload,
				saveAd,
				handleNotification,
				getNotifications,
				notifications,
				createAd,
				advertisement,
				isCheckingUpdate,
				updateAvailable
			}}
		>
			{props.children}
		</MainContext.Provider>
	);
};

export default MainContext;
