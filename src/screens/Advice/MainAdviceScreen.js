import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import { IMG_URL, MAIN_BORDER_RADIUS, ORDER_DATA, SERVER_URL, X_API_KEY } from "../../constant";
import AdviceSideBarFilter from "./AdviceSideBarFilter";
import axios from "axios";
import Empty from "../../components/Empty";
import ListServiceSkeleton from "../../components/Skeletons/ListServiceSkeleton";
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from "react-native-webview";
import MainContext from "../../contexts/MainContext";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const MainAdviceScreen = (props) => {
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet
	const webview = useRef();
	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [active, setActive] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const [loadingServices, setLoadingServices] = useState(false);
	const [adviceData, setAdviceData] = useState([]);
	const [selectedAdviceURL, setSelectedAdviceURL] = useState(null);

	const [adviceDataParams, setAdviceDataParams] = useState({
		order: "DESC",
		page: 1,
		limit: 10,
		mainDirectionId: props.route?.params?.advice_id
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

	const getAdvices = async () => {
		setLoadingServices(true);
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
	}, [adviceDataParams]);

	const handleNavigationStateChanged = (navState) => {
		// console.log("NAVVVVVV", navState);
		const { url } = navState;
	};

	return (
		<SideMenu
			menu={
				<AdviceSideBarFilter
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					mainDirecionId={props.route?.params?.advice_id}
					setAdviceDataParams={setAdviceDataParams}
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
						placeholder={!isFocus ? "Эрэмбэлэлт" : "..."}
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
						<Empty text="Хийгдэж буй ажил олдсонгүй." />
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
							uri: IMG_URL + selectedAdviceURL
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
	}
});
