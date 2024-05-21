import { StyleSheet, Text, StatusBar, Platform, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainContext from "../../../contexts/MainContext";
import { IMG_URL, MAIN_BORDER_RADIUS, SERVER_URL, X_API_KEY } from "../../../constant";
import axios from "axios";
import ListServiceSkeleton from "../../../components/Skeletons/ListServiceSkeleton";
import Empty from "../../../components/Empty";
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from "react-native-webview";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AdviceScreen = (props) => {
	const state = useContext(MainContext);

	const [loadingServices, setLoadingServices] = useState(false);
	const [adviceData, setAdviceData] = useState([]);

	const [selectedAdviceURL, setSelectedAdviceURL] = useState(null);

	const sheetRef = useRef(); //*****Bottomsheet
	const webview = useRef();

	const getAdvices = async () => {
		setLoadingServices(true);
		await axios
			.get(`${SERVER_URL}reference/advice`, {
				params: {
					order: "DESC",
					page: 1,
					limit: 10,
					mainDirectionId: state?.userMainDirID
				},
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
					state.setIsLoggedIn(false);
					state.setErrorMsg("Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү");
				}
			})
			.finally(() => {
				setLoadingServices(false);
			});
	};
	useEffect(() => {
		getAdvices();
	}, []);

	const handleNavigationStateChanged = (navState) => {
		// console.log("NAVVVVVV", navState);
		const { url } = navState;
	};

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingVertical: 10
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
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
								<Image style={styles.fileIcon} source={require("../../../../assets/pdf_icon.png")} />
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
	);
};

export default AdviceScreen;

const styles = StyleSheet.create({
	gridContainer: {
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
