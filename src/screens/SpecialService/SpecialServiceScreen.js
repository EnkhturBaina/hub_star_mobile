import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import SideBarFilter from "../SideBarFilter";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import { IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import SpecialServiceListSekeleton from "../../components/Skeletons/SpecialServiceListSekeleton";
import Empty from "../../components/Empty";
import { i18n } from "../../refs/i18";
import SpecialServiceData from "../../refs/SpecialServiceData";

const SpecialServiceScreen = (props) => {
	const state = useContext(MainContext);
	const scrollViewRef = useRef();
	const tabBarHeight = useBottomTabBarHeight();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);
	const [active, setActive] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [scrollIndex, setScrollIndex] = useState(null);

	const [loadingServices, setLoadingServices] = useState(false);
	const [specialServiceData, setSpecialServiceData] = useState([]);
	const [isListEnd, setIsListEnd] = useState(false); //Бүх дата харуулж дууссан үед харагдах

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

	const getSpecialServiceData = async () => {
		if (!loadingServices && !isListEnd) {
			console.log("getSpecialServiceData RUN ===========>", state.specialServiceParams);
			setLoadingServices(true);
			await axios
				.get(`${SERVER_URL}advertisement`, {
					params: state.specialServiceParams,
					headers: {
						"X-API-KEY": X_API_KEY
					}
				})
				.then((response) => {
					// console.log(
					//   "get SpecialServiceData response",
					//   JSON.stringify(response.data.response)
					if (response.data.response.data?.length > 0) {
						setSpecialServiceData([...specialServiceData, ...response.data.response.data]);
						state.setSpecialServiceParams((prevState) => ({
							...prevState,
							page: state.specialServiceParams.page + 1
						}));
					} else {
						setIsListEnd(true);
					}
				})
				.catch((error) => {
					console.error("Error fetching get SpecialServiceData:", error);
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
		SpecialServiceData.map((el) => {
			if (el.type == state.selectedSpecialService) {
				setScrollIndex(el.index);
			}
		});
		//Side filter -с check хийгдэх үед GET service -н PARAM -уудыг бэлдээд SERVICE -г дуудах
		getSpecialServiceData();
	}, [
		state.specialServiceParams.directionIds,
		state.specialServiceParams.subDirectionIds,
		state.specialServiceParams.specialService
	]);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.gridItem}
				onPress={() => {
					props.navigation.navigate("SingleSpecialScreen", {
						adv_id: item.id
					});
				}}
			>
				<ActivityIndicator
					size="small"
					style={{
						position: "absolute",
						alignSelf: "center",
						justifyContent: "center",
						height: 150
					}}
				/>
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
						height: 110,
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
					<Text style={{ width: "100%", textAlign: "center" }}>Бүх үйлчилгээг харууллаа.</Text>
				) : null}
			</View>
		);
	};

	return (
		<SideMenu
			menu={
				<SideBarFilter
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					isSpecial={1}
					listEndFnc={setIsListEnd}
					setSpecialServiceData={setSpecialServiceData}
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
						ref={scrollViewRef}
						onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: scrollIndex * 150, animated: true })}
					>
						{SpecialServiceData?.map((el, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={[
										styles.typeContainer,
										{
											marginLeft: index == 0 ? 20 : 10,
											borderColor: el.type == state.selectedSpecialService ? MAIN_COLOR : "#fff",
											paddingBottom: el.type == state.selectedSpecialService ? 5 : 0
										}
									]}
									onPress={() => {
										state.setSelectedSpecialService(el.type);
										state.setSpecialServiceParams((prevState) => ({
											...prevState,
											page: 1,
											specialService: el.type
										}));
										setIsListEnd(false);
										setSpecialServiceData([]);
									}}
								>
									<Image
										style={[
											styles.typeLogo,
											{
												width: el.type == state.selectedSpecialService ? 30 : 25,
												height: el.type == state.selectedSpecialService ? 30 : 25
											}
										]}
										resizeMode="contain"
										source={el.icon}
									/>
									<Text
										style={[
											styles.typeText,
											{
												color: el.type == state.selectedSpecialService ? MAIN_COLOR : "#000",
												fontSize: el.type == state.selectedSpecialService ? 18 : 14,
												paddingBottom: el.type == state.selectedSpecialService ? 5 : 0
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
							state.setSpecialServiceParams((prevState) => ({
								...prevState,
								order: item.value == "ASC" ? "ASC" : "DESC"
							}));
						}}
					/>
				</View>
				<View style={styles.gridContainer}>
					{specialServiceData?.length == 0 && loadingServices ? (
						<SpecialServiceListSekeleton />
					) : specialServiceData?.length == 0 && !loadingServices ? (
						<Empty text={i18n.t("specialServiceEmpty")} />
					) : (
						<FlatList
							data={specialServiceData}
							initialNumToRender={10}
							keyExtractor={(item, index) => index.toString()}
							columnWrapperStyle={{ justifyContent: "space-between" }}
							numColumns={2}
							renderItem={renderItem}
							ListFooterComponent={renderFooter} //List ны хамгийн доор харагдах
							onEndReached={getSpecialServiceData} //Scroll доошоо тулхад ажиллах
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

export default SpecialServiceScreen;

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
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		borderBottomWidth: 2
	},
	typeLogo: {
		resizeMode: "contain",
		width: 25,
		height: 25
	},
	typeText: {
		marginLeft: 5,
		fontWeight: "500"
	}
});
