import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import { IMG_URL, MAIN_BORDER_RADIUS, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import AdviceSideBarFilter from "./AdviceSideBarFilter";
import axios from "axios";
import Empty from "../../components/Empty";
import ListServiceSkeleton from "../../components/Skeletons/ListServiceSkeleton";
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from "react-native-webview";
import MainContext from "../../contexts/MainContext";
import { i18n } from "../../refs/i18";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdvicesMainSkeleton from "../../components/Skeletons/AdvicesMainSkeleton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator();

const MainAdviceScreen = (props) => {
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet
	const webview = useRef();
	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [loadingServices, setLoadingServices] = useState(false);
	const [adviceData, setAdviceData] = useState([]);
	const [selectedAdviceURL, setSelectedAdviceURL] = useState(null);

	const [advices, setAdvices] = useState([]);
	const [loadingAdvices, setLoadingAdvices] = useState(false);

	const [adviceDataParams, setAdviceDataParams] = useState({
		order: "DESC",
		page: 1,
		limit: 10,
		mainDirectionId: state.selectedAdvice
	});

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

	const getAdviceCategory = async () => {
		// console.log("RUN getAdviceCategory");
		setLoadingAdvices(true);
		await axios
			.get(`${SERVER_URL}reference/main-direction`, {
				params: {
					isAdvice: 1
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get Advices response", response.data.response);
				setAdvices(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching Advices=>get Advices:=>", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingAdvices(false);
			});
	};

	useEffect(() => {
		getAdviceCategory();
		getAdvices();
	}, []);

	const getAdvices = async () => {
		// console.log("RUN getAdvices =========>", adviceDataParams);
		setLoadingServices(true);
		setAdviceData([]);
		await axios
			.get(`${SERVER_URL}reference/advice`, {
				params: adviceDataParams,
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get Advices ==>", JSON.stringify(response.data.response));
				setAdviceData(response.data.response.data);
			})
			.catch((error) => {
				console.error("Error fetching get Advices:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingServices(false);
			});
	};
	useEffect(() => {
		getAdvices();
	}, []);

	useEffect(() => {
		getAdvices();
	}, [adviceDataParams, state.selectedAdvice]);

	const handleNavigationStateChanged = (navState) => {
		// console.log("NAVVVVVV", navState);
		const { url } = navState;
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
							setValue(item.value);
							setIsFocus(false);
							setAdviceDataParams((prevState) => ({
								...prevState,
								order: item.value == "ASC" ? "ASC" : "DESC"
							}));
						}}
					/>
				</View>
				<ScrollView contentContainerStyle={styles.gridContainer}>
					{adviceData?.length == 0 && loadingServices ? (
						<ListServiceSkeleton />
					) : adviceData?.length == 0 && !loadingServices ? (
						<Empty text={i18n.t("worksEmpty")} />
					) : (
						adviceData?.map((el, index) => {
							return (
								<TouchableOpacity
									onPress={() => {
										setSelectedAdviceURL(el.pdfId);
										sheetRef.current.open();
									}}
									style={styles.gridItem}
									key={index}
								>
									<Image style={styles.fileIcon} source={require("../../../assets/pdf_icon.png")} />
									<Text style={styles.fileText} numberOfLines={2}>
										{el.title}
									</Text>
								</TouchableOpacity>
							);
						})
					)}
				</ScrollView>
			</>
		);
	};
	return (
		<SideMenu
			menu={<AdviceSideBarFilter setIsOpen={setIsOpen} isOpen={isOpen} setAdviceDataParams={setAdviceDataParams} />}
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
				{!loadingAdvices && advices.length > 0 ? (
					<View style={{ flex: 1, height: 100 }}>
						<Tab.Navigator
							initialRouteName={state.selectedAdviceName}
							screenOptions={{
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
							{advices.map((el, index) => {
								return (
									<Tab.Screen
										key={el.id}
										name={el.name}
										component={TabComp}
										listeners={{
											focus: (e) => {},
											tabPress: (e) => {
												state.setSelectedAdvice(el.id);
												state.setSelectedAdviceName(el.name);
												setAdviceDataParams((prevState) => ({
													...prevState,
													mainDirectionId: el.id
												}));
											}
										}}
										options={{
											tabBarItemStyle: {
												flexDirection: "row",
												marginVertical: 5,
												alignItems: "center",
												width: "auto"
											},
											tabBarLabel: ({ focused }) => (
												<Text
													style={[
														styles.typeText,
														{
															color: el.id == state.selectedAdvice ? MAIN_COLOR : "#000",
															fontSize: el.id == state.selectedAdvice ? 18 : 14
														}
													]}
												>
													{el.name}
												</Text>
											),
											animationEnabled: false
										}}
									/>
								);
							})}
						</Tab.Navigator>
					</View>
				) : (
					<AdvicesMainSkeleton />
				)}
				<RBSheet
					ref={sheetRef}
					height={height - 100}
					closeOnDragDown={true} //*****sheet -г доош чирж хаах
					closeOnPressMask={true} //*****sheet -н гадна дарж хаах
					dragFromTopOnly={true}
					customStyles={{
						container: {
							flexDirection: "column",
							borderTopEndRadius: 16,
							borderTopStartRadius: 16
						}
					}}
				>
					<WebView
						injectedJavaScript="window.postMessage(document.title)"
						style={{
							width: width,
							overflow: "hidden"
						}}
						ref={webview}
						source={{
							uri:
								Platform.OS == "ios"
									? IMG_URL + selectedAdviceURL
									: "http://docs.google.com/gview?embedded=true&url=" + IMG_URL + selectedAdviceURL
						}}
						onLoadStart={() => {
							// setVisibleDialogLoader(true);
						}}
						// onLoadEnd={() => setVisibleDialogLoader(false)}
						onNavigationStateChange={handleNavigationStateChanged}
					/>
				</RBSheet>
			</SafeAreaProvider>
		</SideMenu>
	);
};

export default MainAdviceScreen;

const styles = StyleSheet.create({
	dropdown: {
		borderColor: "#aeaeae",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		width: "50%"
	},
	placeholderStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	selectedTextStyle: {
		fontSize: 16,
		fontWeight: "bold"
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	},
	gridContainer: {
		flexGrow: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: 20,
		gap: 2
	},
	gridItem: {
		marginTop: 10,
		borderRadius: MAIN_BORDER_RADIUS,
		height: 150,
		paddingHorizontal: 10,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "48%", // is 50% of container width
		borderColor: "#dadada",
		borderWidth: 1
	},
	fileIcon: {
		height: 70,
		width: 55
	},
	fileText: {
		textAlign: "center",
		color: "#919395",
		fontWeight: "500",
		marginTop: 10
	},
	typeContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		borderBottomWidth: 2
	},
	typeText: {
		marginLeft: 5,
		fontWeight: "500"
	}
});
