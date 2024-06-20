import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import MainContext from "../../contexts/MainContext";
import { IMG_URL, MAIN_BORDER_RADIUS, MAIN_COLOR, ORDER_DATA, SERVER_URL, X_API_KEY } from "../../constant";
import SideMenu from "react-native-side-menu-updated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserTabData from "../../refs/UserTabData";
import axios from "axios";
import Empty from "../../components/Empty";
import UserTypeServicesSkeleton from "../../components/Skeletons/UserTypeServicesSkeleton";
import UserTypeSideBarFilter from "./UserTypeSideBarFilter";
import { i18n } from "../../refs/i18";

const UserTypeServiceScreen = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [loadingServices, setLoadingServices] = useState(false);
	const [userTypeServiceData, setUserTypeServiceData] = useState([]);
	const [isListEnd, setIsListEnd] = useState(false);

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

	const getUserTypeServices = async () => {
		if (!loadingServices && !isListEnd) {
			// console.log("getUserTypeServices RUN ===========>", state.userTypeParam);
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
		//Side filter -с check хийгдэх үед GET service -н PARAM -уудыг бэлдээд SERVICE -г дуудах
		getUserTypeServices();
	}, [state.userTypeParam.directionIds, state.userTypeParam.subDirectionIds, state.userTypeParam.userType]);

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
						height: 130,
						borderTopLeftRadius: 6,
						borderTopRightRadius: 6
					}}
					resizeMode="cover"
				/>
				<View style={{ flexDirection: "column", padding: 10 }}>
					<Text numberOfLines={2} style={{ fontSize: 16, fontWeight: "500", height: 40 }}>
						{item.title}
					</Text>
					<Text style={{ color: "#aeaeae", fontWeight: "500" }} numberOfLines={1}>
						{state.getTypeName(item.userType, item.specialService, (isSlash = false), true)}
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
				<View style={{ marginBottom: 10 }}>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 20 }}
					>
						{UserTabData?.map((el, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={[
										styles.typeContainer,
										{
											marginLeft: index == 0 ? 20 : 10,
											borderColor: el.type == state.selectedUserType ? MAIN_COLOR : "#fff"
										}
									]}
									onPress={() => {
										state.setSelectedUserType(el.type);
										state.setUserTypeParam((prevState) => ({
											...prevState,
											page: 1,
											userType: el.type
										}));
										setIsListEnd(false);
										setUserTypeServiceData([]);
									}}
								>
									<Image style={styles.typeLogo} source={el.image} />
									<Text
										style={[
											styles.typeText,
											{
												color: el.type == state.selectedUserType ? MAIN_COLOR : "#000"
											}
										]}
									>
										{i18n.t(el.title)}
									</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
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
						data={ORDER_DATA}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocus ? i18n.t("order") : "..."}
						value={value}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={(item) => {
							setValue(item.value);
							setIsFocus(false);
							state.setUserTypeParam((prevState) => ({
								...prevState,
								order: item.value == "ASC" ? "ASC" : "DESC"
							}));
						}}
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
		width: "50%"
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
		marginHorizontal: 20
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
		flexDirection: "row",
		alignItems: "center",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: MAIN_BORDER_RADIUS,
		borderWidth: 2
	},
	typeLogo: {
		resizeMode: "contain",
		width: 30,
		height: 30
	},
	typeText: {
		marginLeft: 5,
		textTransform: "capitalize",
		fontWeight: "500"
	}
});
