import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	ActivityIndicator,
	Platform,
	FlatList,
	ScrollView,
	Image,
	TouchableOpacity
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import MainContext from "../../../contexts/MainContext";
import { IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../../constant";
import axios from "axios";
import ListServiceSkeleton from "../../../components/Skeletons/ListServiceSkeleton";
import Empty from "../../../components/Empty";
import { Menu, PaperProvider } from "react-native-paper";
import CustomDialog from "../../../components/CustomDialog";
import { i18n } from "../../../refs/i18";

const PostedScreen = (props) => {
	const state = useContext(MainContext);

	const [loadingServices, setLoadingServices] = useState(false);
	const [postedServiceData, setPostedServiceData] = useState([]);
	const [offset, setOffset] = useState(1);
	const [isListEnd, setIsListEnd] = useState(false); //Бүх дата харуулж дууссан үед харагдах

	const [visibleMenu, setVisibleMenu] = useState(null);

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("success"); //Dialog харуулах төрөл

	const [selectedAd, setSelectedAd] = useState(null);

	const openMenu = (id) => setVisibleMenu(id);
	const closeMenu = () => setVisibleMenu(null);

	const getPostedServices = async () => {
		if (!loadingServices && !isListEnd) {
			setLoadingServices(true);
			await axios
				.get(`${SERVER_URL}advertisement`, {
					params: {
						order: "DESC",
						page: offset,
						limit: 10,
						createdBy: state.userId
					},
					headers: {
						"X-API-KEY": X_API_KEY
					}
				})
				.then((response) => {
					// console.log(
					//   "get PostedServices",
					//   JSON.stringify(response.data.response)
					// );
					// setPostedServiceData(response.data.response.data);
					if (response.data.response.data?.length > 0) {
						setPostedServiceData([...postedServiceData, ...response.data.response.data]);
						setOffset(offset + 1);
					} else {
						setIsListEnd(true);
					}
				})
				.catch((error) => {
					console.error("Error fetching get PostedServices:", error);
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
		getPostedServices();
	}, []);

	const removeAd = async () => {
		console.log("removeAd", removeAd);
		await axios
			.delete(`${SERVER_URL}advertisement/${selectedAd}`, {
				headers: {
					"X-API-KEY": X_API_KEY,
					Authorization: `Bearer ${state.token}`
				}
			})
			.then((response) => {
				console.log("remove Ad =========>", response.data);
				if (response.data.statusCode == 200) {
					setPostedServiceData(removeById(postedServiceData, selectedAd));
				}
			})
			.catch((error) => {
				console.error("Error fetching get ProfileData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	const removeById = (array, id) => {
		console.log("array", JSON.stringify(array));
		const index = array.findIndex((item) => item.id === id);
		if (index !== -1) {
			array.splice(index, 1);
		}
		console.log("array2", JSON.stringify(array));
		return array;
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.gridItem}
				onPress={() => {
					props.navigation.navigate("SingleServiceScreen", {
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
							: require("../../../../assets/splash_bg_1.jpg")
					}
					style={{
						width: 100,
						height: 90,
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
						backgroundColor: "#fff"
					}}
					resizeMode="cover"
				/>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						padding: 10
					}}
				>
					<Text numberOfLines={2} style={{ flex: 1, fontSize: 16, fontWeight: "500" }}>
						{item.title}
					</Text>
					<Text style={{ color: "#aeaeae", fontWeight: "500" }}>
						{state.getTypeName(item.userType, item.specialService, (isSlash = false), true)}
					</Text>
					<Text style={{ color: MAIN_COLOR, fontWeight: "500" }} numberOfLines={1}>
						{state.addCommas(state.removeNonNumeric(item.price)) ?? "-"}₮
					</Text>
				</View>
				<Menu
					visible={visibleMenu === item.id}
					onDismiss={closeMenu}
					elevation={1}
					contentStyle={{ backgroundColor: "#fff", borderRadius: 6 }}
					anchor={
						<Icon
							name="dots-three-vertical"
							type="entypo"
							size={20}
							color="#c5c5c5"
							onPress={() => openMenu(item.id)}
							style={{ marginBottom: 10, marginRight: 5, padding: 5 }}
						/>
					}
				>
					<Menu.Item
						onPress={() => {
							closeMenu();
							state.setCurrentStep(1);
							state.setServiceData(item);
							state.setIsEditAd(true);
							if (item.specialService != null) {
								props.navigation.navigate("UPDATE_AddServiceSpecial", {
									images: item.images
								});
							} else if (item.userType != null) {
								props.navigation.navigate("UPDATE_AddService", {
									images: item.images
								});
							}
						}}
						leadingIcon="square-edit-outline"
						title={i18n.t("edit")}
					/>
					<Menu.Item
						onPress={() => {
							setSelectedAd(item.id);
							closeMenu();
							setVisibleDialog(true);
						}}
						leadingIcon="delete"
						title={i18n.t("delete")}
					/>
				</Menu>
			</TouchableOpacity>
		);
	};

	const renderFooter = () => {
		return (
			<View>
				{loadingServices ? (
					<ActivityIndicator color={MAIN_COLOR} style={{ padding: 5, paddingBottom: Platform.OS == "ios" ? 20 : 10 }} />
				) : null}
				<TouchableOpacity
					onPress={() =>
						props.navigation.navigate("UPDATE_AddServiceFirst", {
							isFromPosted: 1
						})
					}
					style={styles.addItemContainer}
				>
					<Icon name="pluscircle" type="antdesign" size={50} color="#c5c5c5" />
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff"
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<ScrollView contentContainerStyle={styles.gridContainer}>
				{postedServiceData?.length == 0 && loadingServices ? (
					<ListServiceSkeleton />
				) : postedServiceData?.length == 0 && !loadingServices ? (
					<Empty text={i18n.t("postedServiceEmpty")} />
				) : (
					<FlatList
						data={postedServiceData}
						initialNumToRender={10}
						keyExtractor={(item, index) => item.id?.toString()}
						renderItem={renderItem}
						ListFooterComponent={renderFooter} //List ны хамгийн доор харагдах
						onEndReached={getPostedServices} //Scroll доошоо тулхад ажиллах
						onEndReachedThreshold={0.5}
						showsVerticalScrollIndicator={false}
						bounces={false}
						scrollEnabled={false}
					/>
				)}
			</ScrollView>
			<CustomDialog
				visible={visibleDialog}
				confirmFunction={() => {
					removeAd();
					setVisibleDialog(false);
				}}
				declineFunction={() => {
					setVisibleDialog(false);
				}}
				text={i18n.t("confirmDeleteAd")}
				confirmBtnText={i18n.t("delete")}
				DeclineBtnText={i18n.t("close")}
				type={dialogType}
			/>
		</SafeAreaProvider>
	);
};

export default PostedScreen;

const styles = StyleSheet.create({
	gridContainer: {
		flexGrow: 1,
		paddingVertical: 10
	},
	gridItem: {
		marginBottom: 15,
		marginHorizontal: 20,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 6,
		flexDirection: "row",
		height: 90,
		alignItems: "flex-end"
	},
	addItemContainer: {
		marginHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		height: 90,
		backgroundColor: "#e5e5e5",
		borderRadius: 6
	}
});
