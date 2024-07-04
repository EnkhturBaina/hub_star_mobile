import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import MainContext from "../../contexts/MainContext";
import { IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import SideMenu from "react-native-side-menu-updated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserTabData from "../../refs/UserTabData";
import axios from "axios";
import Empty from "../../components/Empty";
import UserTypeServicesSkeleton from "../../components/Skeletons/UserTypeServicesSkeleton";
import UserTypeSideBarFilter from "./UserTypeSideBarFilter";
import { i18n } from "../../refs/i18";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const UserTypeServiceScreen = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [valueDaats, setValueDaats] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [isFocusDaats, setIsFocusDaats] = useState(false);
	const [isFocusMaterialType, setIsFocusMaterialType] = useState(false);
	const [isFocusProvince, setIsFocusProvince] = useState(false);
	const [isFocusDistrict, setIsFocusDistrict] = useState(false);
	const [isFocusKhoroo, setIsFocusKhoroo] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [loadingServices, setLoadingServices] = useState(false);
	const [userTypeServiceData, setUserTypeServiceData] = useState([]);
	const [isListEnd, setIsListEnd] = useState(false);

	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [khoroos, setKhoroos] = useState([]);
	const [materials, setMaterials] = useState([]);

	const DAATS = [
		{ label: "Хүнд даац", value: "small" },
		{ label: "Дунд даац", value: "medium" },
		{ label: "Бага даац", value: "large" }
	];
	useLayoutEffect(() => {
		// TabBar Hide хийх
		props.navigation?.getParent()?.setOptions({
			tabBarStyle: {
				display: "none"
			}
		});
		return () =>
			props.navigation?.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					height: Platform.OS == "ios" ? 105 : 80,
					padding: 10
				}
			});
		// TabBar Hide хийх
	}, [props.navigation]);

	const getMaterialType = async (params) => {
		console.log("RUN getMaterialType");
		await axios
			.get(`${SERVER_URL}reference/machinery`, {
				params: {
					type: "MATERIAL"
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				let updatedItemList = response.data.response.map((item) => {
					return {
						...item,
						label: item.name,
						value: item.id
					};
				});
				setMaterials(updatedItemList);
			})
			.catch(function (error) {
				if (error.response) {
					// console.log("error getIntro Data status", error.response.status);
					// console.log("error getIntro Data data", error.response.data);
				}
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};
	const getAddress = async (params) => {
		console.log("RUN getAddress");
		await axios
			.get(`${SERVER_URL}reference/address`, {
				params,
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				let updatedItemList = response.data.response.map((item) => {
					return {
						...item,
						label: item.name,
						value: item.id
					};
				});

				// console.log("get Address", JSON.stringify(response.data.response));
				params.type == "PROVINCE" && setProvinces(updatedItemList);
				params.type == "DISTRICT" && setDistricts(updatedItemList);
				params.type == "KHOROO" && setKhoroos(updatedItemList);
			})
			.catch(function (error) {
				if (error.response) {
					// console.log("error getIntro Data status", error.response.status);
					// console.log("error getIntro Data data", error.response.data);
				}
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	const getUserTypeServices = async () => {
		console.log("RUN getUserTypeServices");
		if (!loadingServices && !isListEnd) {
			// console.log("getUserTypeServices RUNx ===========>", state.userTypeParam);
			setLoadingServices(true);
			await axios
				.get(`${SERVER_URL}advertisement`, {
					params: state.userTypeParam,
					headers: {
						"X-API-KEY": X_API_KEY
					}
				})
				.then((response) => {
					// console.log("get UserTypeServices response", JSON.stringify(response.data.response));
					if (response.data.response.data?.length > 0) {
						setUserTypeServiceData([...userTypeServiceData, ...response.data.response.data]);
						state.setUserTypeParam((prevState) => ({
							...prevState,
							page: state.userTypeParam.page + 1
						}));
					} else {
						setIsListEnd(true);
					}
				})
				.catch((error) => {
					console.error("Error fetching get UserTypeServices:", error);
					if (error.response.status == "401") {
						state.Handle_401();
					}
				})
				.finally(() => {
					setLoadingServices(false);
				});
		}
	};

	useEffect(() => {
		getMaterialType();
		getAddress({ type: "PROVINCE" });
	}, []);

	useEffect(() => {
		state.userTypeParam?.provinceId &&
			getAddress({
				type: "DISTRICT",
				parentId: state.userTypeParam?.provinceId
			});
		state.setUserTypeParam((prevState) => ({
			...prevState,
			districtId: null,
			khorooId: null
		}));
	}, [state.userTypeParam?.provinceId]);

	useEffect(() => {
		state.userTypeParam?.districtId &&
			getAddress({
				type: "KHOROO",
				parentId: state.userTypeParam?.districtId
			});
		state.setUserTypeParam((prevState) => ({
			...prevState,
			khorooId: null
		}));
	}, [state.userTypeParam?.districtId]);

	useEffect(() => {
		//Side filter -с check хийгдэх үед GET service -н PARAM -уудыг бэлдээд SERVICE -г дуудах
		getUserTypeServices();
	}, [
		state.userTypeParam.directionIds,
		state.userTypeParam.subDirectionIds,
		state.userTypeParam.userType,
		state.userTypeParam.provinceId,
		state.userTypeParam.districtId,
		state.userTypeParam.khorooId,
		state.userTypeParam.materialId
	]);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.gridItem}
				onPress={() => {
					props.navigation.navigate("SingleUserTypeServiceScreen", {
						adv_id: item.id
					});
				}}
			>
				<Image
					source={
						item.images[0]
							? {
									uri: IMG_URL + item.images[0]?.id
							  }
							: require("../../../assets/splash_bg_1.jpg")
					}
					style={{
						width: "100%",
						height: 100,
						borderTopLeftRadius: 6,
						borderTopRightRadius: 6
					}}
					resizeMode="cover"
				/>
				<View style={{ flexDirection: "column", padding: 10 }}>
					<Text numberOfLines={2} style={{ fontSize: 16, fontWeight: "500" }}>
						{item.title}
					</Text>
					<Text style={{ color: "#aeaeae", fontWeight: "500" }} numberOfLines={1}>
						{state.getTypeName(item.userType, item.specialService, (isSlash = false), true)}
					</Text>
					<Text style={{ color: MAIN_COLOR, fontWeight: "500" }} numberOfLines={1}>
						{state.addCommas(state.removeNonNumeric(item.price)) ?? "-"}₮
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const renderFooter = () => {
		return (
			<View style={{ paddingBottom: Platform.OS == "ios" ? 20 : 10 }}>
				{loadingServices ? (
					<ActivityIndicator color={MAIN_COLOR} style={{ padding: 5 }} />
				) : isListEnd && !loadingServices ? (
					<Text style={{ width: "100%", textAlign: "center" }}>{i18n.t("shownAllServices")}</Text>
				) : null}
			</View>
		);
	};

	const TabComp = () => {
		return (
			<>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginHorizontal: 20,
						paddingBottom: 10
					}}
				>
					<Icon
						name="options"
						type="ionicon"
						size={23}
						style={{
							borderWidth: 0.5,
							padding: 5,
							borderRadius: 8,
							borderColor: "#aeaeae"
						}}
						onPress={() => setIsOpen(!isOpen)}
					/>
					<Dropdown
						style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={state.ORDER_DATA}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocus ? i18n.t("order") : "..."}
						value={value}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={(item) => {
							setIsListEnd(false);
							setUserTypeServiceData([]);
							setValue(item.value);
							setIsFocus(false);
							state.setUserTypeParam((prevState) => ({
								...prevState,
								order: item.value == "ASC" ? "ASC" : "DESC"
							}));
						}}
					/>
				</View>
				<View style={styles.filterContainer}>
					{state.userTypeParam.userType == "SUPPLIER" && (
						<Dropdown
							style={[styles.dropdown, isFocusMaterialType && { borderColor: "blue" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							data={materials}
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={!isFocusMaterialType ? i18n.t("materialType") : "..."}
							value={state.userTypeParam.materialId}
							onFocus={() => setIsFocusMaterialType(true)}
							onBlur={() => setIsFocusMaterialType(false)}
							onChange={(item) => {
								setIsListEnd(false);
								setUserTypeServiceData([]);
								setIsFocusMaterialType(false);
								state.setUserTypeParam((prevState) => ({
									...prevState,
									materialId: item.value
								}));
							}}
						/>
					)}
					{state.userTypeParam.userType == "TRANSPORTATION" && (
						<Dropdown
							style={[styles.dropdown, isFocusDaats && { borderColor: "blue" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							data={DAATS}
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={!isFocusDaats ? i18n.t("tonnage") : "..."}
							value={valueDaats}
							onFocus={() => setIsFocusDaats(true)}
							onBlur={() => setIsFocusDaats(false)}
							onChange={(item) => {
								setValueDaats(item.value);
								// setIsListEnd(false);
								// setUserTypeServiceData([]);
								// setIsFocusProvince(false);
								// state.setUserTypeParam((prevState) => ({
								// 	...prevState,
								// 	provinceId: item.value
								// }));
							}}
						/>
					)}
					<Dropdown
						style={[styles.dropdown, isFocusProvince && { borderColor: "blue" }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={provinces}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocusProvince ? i18n.t("adProvince") : "..."}
						value={state.userTypeParam.provinceId}
						onFocus={() => setIsFocusProvince(true)}
						onBlur={() => setIsFocusProvince(false)}
						onChange={(item) => {
							setIsListEnd(false);
							setUserTypeServiceData([]);
							setIsFocusProvince(false);
							state.setUserTypeParam((prevState) => ({
								...prevState,
								provinceId: item.value
							}));
						}}
					/>
					<Dropdown
						style={[styles.dropdown, isFocusDistrict && { borderColor: "blue" }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={districts}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocusDistrict ? i18n.t("adDistrict") : "..."}
						value={state.userTypeParam.districtId}
						onFocus={() => setIsFocusDistrict(true)}
						onBlur={() => setIsFocusDistrict(false)}
						onChange={(item) => {
							setIsListEnd(false);
							setUserTypeServiceData([]);
							setIsFocusDistrict(false);
							state.setUserTypeParam((prevState) => ({
								...prevState,
								districtId: item.value
							}));
						}}
						disable={districts?.length == 0}
					/>
					<Dropdown
						style={[styles.dropdown, isFocusKhoroo && { borderColor: "blue" }]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						data={khoroos}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocusKhoroo ? i18n.t("adKhoroo") : "..."}
						value={state.userTypeParam.khorooId}
						onFocus={() => setIsFocusKhoroo(true)}
						onBlur={() => setIsFocusKhoroo(false)}
						onChange={(item) => {
							setIsListEnd(false);
							setUserTypeServiceData([]);
							setIsFocusKhoroo(false);
							state.setUserTypeParam((prevState) => ({
								...prevState,
								khorooId: item.value
							}));
						}}
						disable={khoroos?.length == 0}
					/>
				</View>
				<View style={styles.gridContainer}>
					{userTypeServiceData?.length == 0 && loadingServices ? (
						<UserTypeServicesSkeleton />
					) : userTypeServiceData?.length == 0 && !loadingServices ? (
						<Empty text={i18n.t("serviceEmpty")} />
					) : (
						<FlatList
							data={userTypeServiceData}
							initialNumToRender={10}
							keyExtractor={(item, index) => index.toString()}
							columnWrapperStyle={{ justifyContent: "space-between" }}
							numColumns={2}
							renderItem={renderItem}
							ListFooterComponent={renderFooter} //List ны хамгийн доор харагдах
							onEndReached={getUserTypeServices} //Scroll доошоо тулхад ажиллах
							onEndReachedThreshold={0.5}
							showsVerticalScrollIndicator={false}
							bounces={false}
						/>
					)}
				</View>
			</>
		);
	};
	return (
		<SideMenu
			menu={
				<UserTypeSideBarFilter
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					listEndFnc={setIsListEnd}
					listData={setUserTypeServiceData}
				/>
			}
			isOpen={isOpen}
			onChange={(isOpen) => setIsOpen(isOpen)}
		>
			<SafeAreaProvider
				style={{
					flex: 1,
					backgroundColor: "#fff",
					paddingBottom: tabBarHeight
				}}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<View style={{ flex: 1, height: 100 }}>
					<Tab.Navigator
						initialRouteName={state.selectedUserType}
						screenOptions={{
							swipeEnabled: false,
							tabBarAndroidRipple: {
								color: "transparent"
							},
							tabBarLabelStyle: {
								width: "100%",
								textTransform: "none"
							},
							tabBarItemStyle: {
								width: "auto",
								marginRight: 10
							},
							tabBarStyle: {
								backgroundColor: "#fff"
							},
							tabBarIndicatorStyle: {
								backgroundColor: MAIN_COLOR,
								height: 3
								// width: 50,
							},
							tabBarScrollEnabled: true
						}}
						sceneContainerStyle={{
							backgroundColor: "#fff",
							marginTop: 10
						}}
						style={{
							backgroundColor: "#fff"
						}}
					>
						{UserTabData.map((el, index) => {
							return (
								<Tab.Screen
									key={index}
									name={el.type}
									component={TabComp}
									listeners={{
										focus: (e) => {},
										tabPress: (e) => {
											var tabName = e.target.split("-")?.[0];
											state.setSelectedUserType(tabName);
											state.setUserTypeParam((prevState) => ({
												...prevState,
												page: 1,
												userType: tabName
											}));
											setIsListEnd(false);
											setUserTypeServiceData([]);
										}
									}}
									options={{
										tabBarItemStyle: {
											flexDirection: "row",
											marginVertical: 5,
											alignItems: "center",
											width: "auto"
										},
										tabBarIcon: ({ focused }) => (
											<Image
												style={[
													styles.typeLogo,
													{
														width: el.type == state.selectedUserType ? 31 : 28,
														height: el.type == state.selectedUserType ? 31 : 28
													}
												]}
												resizeMode="contain"
												source={el.image}
											/>
										),
										tabBarLabel: ({ focused }) => (
											<Text
												style={[
													styles.typeText,
													{
														color: el.type == state.selectedUserType ? MAIN_COLOR : "#000",
														fontSize: el.type == state.selectedUserType ? 18 : 14
													}
												]}
											>
												{i18n.t(el.title)}
											</Text>
										),
										animationEnabled: false
									}}
								/>
							);
						})}
					</Tab.Navigator>
				</View>
			</SafeAreaProvider>
		</SideMenu>
	);
};

export default UserTypeServiceScreen;

const styles = StyleSheet.create({
	dropdown: {
		borderColor: "#aeaeae",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		width: "49%",
		marginBottom: 5
	},
	icon: {
		marginRight: 5
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14
	},
	placeholderStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	selectedTextStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	},
	gridContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: 20,
		paddingTop: 10
	},
	gridItem: {
		marginBottom: 15,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 6,
		width: "48%"
	},
	typeContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		alignSelf: "center"
	},
	typeLogo: {
		resizeMode: "contain",
		width: 30,
		height: 30
	},
	typeText: {
		flex: 1,
		marginLeft: 5,
		fontWeight: "500",
		marginTop: 5
	},
	filterContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: 20
	}
});
