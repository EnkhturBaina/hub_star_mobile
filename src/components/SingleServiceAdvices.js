import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, ScrollView, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MainContext from "../contexts/MainContext";
import "dayjs/locale/es";
import dayjs from "dayjs";
import GradientButton from "./GradientButton";
import { useNavigation } from "@react-navigation/native";
import { IMG_URL, MAIN_BORDER_RADIUS, SERVER_URL, X_API_KEY } from "../constant";
import axios from "axios";
import AdvicesSkeleton from "./Skeletons/AdvicesSkeleton";
import RBSheet from "react-native-raw-bottom-sheet";
import { WebView } from "react-native-webview";
import { i18n } from "../refs/i18";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SingleServiceAdvices = (props) => {
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet
	const webview = useRef();
	const navigation = useNavigation();
	const [loadingServices, setLoadingServices] = useState(false);
	const [adviceData, setAdviceData] = useState([]);
	const [selectedAdviceURL, setSelectedAdviceURL] = useState(null);

	const getAdvices = async () => {
		setLoadingServices(true);
		await axios
			.get(`${SERVER_URL}reference/advice`, {
				params: {
					page: 1,
					limit: 10,
					order: "DESC",
					mainDirectionId: props.mainDirectionId,
					directionIds: [props.directionId]
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

	const handleNavigationStateChanged = (navState) => {
		const { url } = navState;
	};
	return (
		<View style={{ paddingBottom: 10 }}>
			<Text style={styles.specialServiceText}>{i18n.t("recommendAdvices")}</Text>
			<View style={{ marginTop: 10 }}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
				>
					{adviceData?.length == 0 && loadingServices ? (
						<AdvicesSkeleton />
					) : adviceData?.length == 0 && !loadingServices ? (
						<Text>{i18n.t("notFoundRecommendAdvices")}</Text>
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
									<Image style={styles.fileIcon} source={require("../../assets/pdf_icon.png")} />
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
			</View>
		</View>
	);
};

export default SingleServiceAdvices;

const styles = StyleSheet.create({
	specialServiceText: {
		fontWeight: "bold",
		fontSize: 16,
		marginLeft: 20,
		marginTop: 10
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
		borderRadius: MAIN_BORDER_RADIUS,
		height: 150,
		paddingHorizontal: 10,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: 160,
		borderColor: "#dadada",
		borderWidth: 1,
		marginRight: 15
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
