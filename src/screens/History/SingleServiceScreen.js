import {
	StyleSheet,
	Text,
	View,
	Platform,
	StatusBar,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../../constant";
import axios from "axios";
import { Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import ServiceDTLSkeleton from "../../components/Skeletons/ServiceDTLSkeleton";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomSnackbar from "../../components/CustomSnackbar";
import SingleServiceTypes from "../../components/SingleServiceTypes";
import SingleServiceDetails from "../../components/SingleServiceDetails";
import SingleServiceAdvices from "../../components/SingleServiceAdvices";
import { i18n } from "../../refs/i18";

const SingleServiceScreen = (props) => {
	const state = useContext(MainContext);
	const tabBarHeight = useBottomTabBarHeight();
	const [loadingAdvice, setLoadingAdvice] = useState(false);
	const [adviceData, setAdviceData] = useState(null);
	const [visible1, setVisible1] = useState(false);
	const [zoomImgURL, setZoomImgURL] = useState(null);

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

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

	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

	const getAdvice = async () => {
		setLoadingAdvice(true);
		await axios
			.get(`${SERVER_URL}advertisement/${props.route?.params?.adv_id}`, {
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get Advice response", JSON.stringify(response.data.response));
				setAdviceData(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching get Advice:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingAdvice(false);
			});
	};
	useEffect(() => {
		getAdvice();
	}, []);
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				marginBottom: 0
			}}
		>
			<SafeAreaProvider
				style={{
					flex: 1,
					backgroundColor: "#fff",
					paddingBottom: tabBarHeight
				}}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<CustomSnackbar visible={visibleSnack} dismiss={onDismissSnackBar} text={snackBarMsg} topPos={1} />
				{loadingAdvice || adviceData == null ? (
					<ServiceDTLSkeleton />
				) : (
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1
						}}
						showsVerticalScrollIndicator={false}
						bounces={false}
					>
						{adviceData?.images && adviceData?.images?.length > 0 ? (
							<TouchableOpacity
								onPress={() => {
									setZoomImgURL(IMG_URL + adviceData?.images[0].id);
									setVisible1(true);
								}}
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 20
								}}
							>
								<ActivityIndicator size="small" style={styles.slideImg} />
								<Image source={{ uri: IMG_URL + adviceData?.images[0].id }} style={styles.thumbImg} />
							</TouchableOpacity>
						) : null}
						{adviceData?.images?.length > 1 ? (
							<View
								style={{
									marginHorizontal: 20
								}}
							>
								<ScrollView
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={{
										flexGrow: 1,
										marginVertical: 10
									}}
								>
									{adviceData?.images?.map((el, index) => {
										if (index != 0) {
											return (
												<TouchableOpacity
													key={index}
													onPress={() => {
														setZoomImgURL(IMG_URL + el.id);
														setVisible1(true);
													}}
													style={styles.thumbImgs}
												>
													<Image
														source={{ uri: IMG_URL + el.id }}
														style={{
															flex: 1,
															borderRadius: 12
														}}
													/>
												</TouchableOpacity>
											);
										}
									})}
								</ScrollView>
							</View>
						) : null}
						<View
							style={{
								marginHorizontal: 20,
								paddingBottom: 20
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 22, marginTop: 10 }}>{adviceData?.title}</Text>
							<Text style={styles.breadContainer}>
								{state.getTypeName(adviceData.userType, adviceData.specialService, (isSlash = true), true)}
								{adviceData?.mainDirection != null ? `${adviceData?.mainDirection?.name} / ` : null}
								{adviceData?.direction != null ? `${adviceData?.direction?.name} / ` : null}
								{adviceData?.subDirection != null ? `${adviceData?.subDirection?.name}` : null}
							</Text>
							<View style={styles.topSectionContainer}>
								<Icon
									name="flag"
									type="feather"
									size={25}
									style={styles.flagIcon}
									onPress={() => {
										state.saveAd(adviceData?.id).then((value) => {
											onToggleSnackBar(value);
										});
									}}
								/>
								<View style={{ width: "85%" }}>
									<GradientButton
										text="Үйлчилгээг захиалах"
										action={() => {
											state
												.handleNotification({
													id: 0,
													authorId: adviceData.createdBy,
													advertisementId: adviceData.id,
													process: "DOING",
													description: "Таньд ирсэн захиалга."
												})
												.then((value) => {
													onToggleSnackBar(value);
												});
										}}
										height={40}
										radius={6}
									/>
								</View>
							</View>
							<Text>{adviceData?.desciption}</Text>
						</View>
						<SingleServiceTypes directionId={adviceData?.directionId} />
						<SingleServiceAdvices mainDirectionId={adviceData?.mainDirectionId} directionId={adviceData?.directionId} />
						<SingleServiceDetails adviceData={adviceData} />
					</ScrollView>
				)}
				<Modal
					animationType="slide"
					transparent={true}
					onRequestClose={() => {
						setVisible1(!visible1);
					}}
					visible={visible1}
					style={{
						backgroundColor: "rgba(52, 52, 52, 0.9)"
					}}
				>
					<View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.9)" }}>
						<GestureHandlerRootView>
							<ImageZoom source={{ uri: zoomImgURL }} style={{ flex: 1, height: 200, width: "100%" }} />
						</GestureHandlerRootView>
						<View style={{ width: 200, alignSelf: "center", marginTop: 10 }}>
							<GradientButton text={i18n.t("close")} action={() => setVisible1(false)} height={40} radius={6} />
						</View>
					</View>
				</Modal>
			</SafeAreaProvider>
		</View>
	);
};

export default SingleServiceScreen;

const styles = StyleSheet.create({
	slideImg: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 220
	},
	dialogOverlay: {
		height: "100%",
		backgroundColor: "rgba(52, 52, 52, 0.9)",
		width: "100%",
		paddingHorizontal: 0,
		paddingVertical: 20
	},
	thumbImgs: {
		width: 110,
		height: 80,
		marginRight: 20,
		borderRadius: 12
	},
	topSectionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 10,
		marginVertical: 10
	},
	flagIcon: {
		borderWidth: 0.5,
		padding: 8,
		borderRadius: 8,
		borderColor: "#aeaeae",
		height: 40
	},
	breadContainer: {
		color: "#646669",
		fontSize: 14,
		fontWeight: "bold",
		marginTop: 5
	},
	thumbImg: {
		height: 220,
		width: "100%",
		flex: 1,
		borderRadius: 12,
		backgroundColor: "#fff"
	}
});
