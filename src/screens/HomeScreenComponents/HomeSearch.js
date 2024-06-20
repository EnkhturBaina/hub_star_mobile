import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import {
	GRAY_ICON_COLOR,
	IMG_URL,
	MAIN_BG_GRAY,
	MAIN_BORDER_RADIUS,
	MAIN_COLOR,
	MAIN_COLOR_GRAY,
	SERVER_URL,
	X_API_KEY
} from "../../constant";
import { Icon, ListItem } from "@rneui/base";
import RBSheet from "react-native-raw-bottom-sheet";
import MainContext from "../../contexts/MainContext";
import { useNavigation } from "@react-navigation/native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import axios from "axios";
import { i18n } from "../../refs/i18";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeSearch = () => {
	const navigation = useNavigation();
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet
	const [expanded, setExpanded] = useState({});
	const [searchVal, setSearchVal] = useState("");
	const searchRef = useRef(null);
	const dropdownController = useRef(null);
	const [loadingSideFilter, setLoadingSideFilter] = useState(false);
	const [sideFilterData, setSideFilterData] = useState([]);

	const [selectedItem, setSelectedItem] = useState(null);

	function convertToSingleArray(data) {
		let result = [];
		data.forEach((item) => {
			if (item.directions) {
				result = result.concat(item.directions);
			}
			if (item.directions && item.directions.length > 0 && item.directions[0].subDirections) {
				result = result.concat(item.directions[0].subDirections);
			}
		});
		return result;
	}

	function changeKey(array, oldKey, newKey) {
		return array?.map((item) => {
			const newItem = { ...item };
			if (newItem.hasOwnProperty(oldKey)) {
				newItem[newKey] = newItem[oldKey];
				delete newItem[oldKey];
			}
			return newItem;
		});
	}

	const getSideFilterData = useCallback(async (val) => {
		setLoadingSideFilter(true);
		await axios
			.get(`${SERVER_URL}reference/main-direction/filter`, {
				params: {
					name: val
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				if (response.data.response.data.length > 0) {
					dropdownController.current.open();
				}
				// console.log("get SideFilterData response", JSON.stringify(response.data.response));
				const singleArray = convertToSingleArray(response.data.response?.data);
				const modifiedArray = changeKey(singleArray, "name", "title");
				setSideFilterData(modifiedArray);
			})
			.catch((error) => {
				console.error("Error fetching Side BarFilter:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingSideFilter(false);
			});
	}, []);
	return (
		<TouchableOpacity
			style={styles.searchContainer}
			activeOpacity={1}
			onPress={() => {
				// props.navigation.navigate("SearchScreen")
			}}
		>
			<Icon name="search" type="feather" size={20} color={GRAY_ICON_COLOR} />
			<AutocompleteDropdown
				controller={(controller) => {
					dropdownController.current = controller;
				}}
				loading={loadingSideFilter}
				clearOnFocus={false}
				onSelectItem={setSelectedItem}
				dataSet={sideFilterData}
				containerStyle={{ flexGrow: 1, flexShrink: 1, backgroundColor: MAIN_COLOR_GRAY }}
				inputContainerStyle={{
					backgroundColor: MAIN_COLOR_GRAY
				}}
				onChangeText={(e) => {
					getSideFilterData(e);
				}}
				emptyResultText={i18n.t("noResultsFound")}
				renderItem={(item, text) => (
					<TouchableOpacity
						onPress={() => {
							// console.log("item", item);
							navigation.navigate("MainDirServiceScreen", {
								mainDirectionId: item.mainDirectionId,
								directionId: [item.directionId],
								subDirectionId: [item.id],
								fromCAT: false
							});
						}}
					>
						<Text style={{ padding: 15 }}>{item.title}</Text>
					</TouchableOpacity>
				)}
				suggestionsListMaxHeight={300}
				textInputProps={{
					placeholder: i18n.t("search")
				}}
				flatListProps={{
					removeClippedSubviews: true,
					maxToRenderPerBatch: 10,
					initialNumToRender: 10,
					onEndReachedThreshold: 0.1,
					windowSize: 5,
					updateCellsBatchingPeriod: 30
				}}
			/>
			<TouchableOpacity style={styles.filterBtn} onPress={() => sheetRef.current.open()}>
				{/* <Icon name="sliders" type="feather" size={20} color={GRAY_ICON_COLOR} /> */}
				<Image style={{ width: 20, height: 20 }} source={require("../../../assets/figma-icons/filter.png")} />
			</TouchableOpacity>
			<RBSheet
				ref={sheetRef}
				height={height - 100}
				closeOnDragDown={true} //*****sheet -г доош чирж хаах
				closeOnPressMask={true} //*****sheet -н гадна дарж хаах
				dragFromTopOnly={true}
				customStyles={{
					container: {
						backgroundColor: MAIN_BG_GRAY,
						flexDirection: "column",
						borderTopEndRadius: 16,
						borderTopStartRadius: 16
					}
				}}
				onClose={() => {
					setExpanded({});
				}}
			>
				<View style={styles.dirMainContainer}>
					<ScrollView nestedScrollEnabled contentContainerStyle={styles.dirContainer} bounces={false}>
						{state.mainDirection?.map((el, index) => {
							return (
								<View key={index} style={styles.eachDir}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingBottom: 3
										}}
									>
										<Image
											style={{ width: 20, height: 20 }}
											source={{
												uri: IMG_URL + el.logoId
											}}
										/>
										<Text
											style={{
												fontWeight: "bold",
												textTransform: "uppercase",
												marginLeft: 5
											}}
										>
											{el.name}
										</Text>
									</View>
									<View
										style={{
											paddingTop: 10
										}}
									>
										{el.directions?.map((child, index2) => {
											const checkOpen = expanded[index + "-" + index2];
											return (
												<ListItem.Accordion
													noIcon={child?.subDirections != "" ? false : true}
													key={index + "-" + index2}
													content={
														<ListItem.Content>
															<ListItem.Title
																style={{
																	color: checkOpen ? MAIN_COLOR : "#6f7275",
																	fontWeight: "500",
																	marginBottom: 5
																}}
															>
																{child.name}
															</ListItem.Title>
														</ListItem.Content>
													}
													isExpanded={checkOpen}
													onPress={() => {
														child?.subDirections != "" &&
															setExpanded((prevState) => ({
																...prevState,
																[index + "-" + index2]: !prevState[index + "-" + index2]
															}));
													}}
													containerStyle={{
														paddingVertical: 8,
														paddingHorizontal: 3,
														backgroundColor: MAIN_BG_GRAY
													}}
												>
													<ListItem
														containerStyle={{
															flexDirection: "column",
															alignItems: "flex-start",
															backgroundColor: MAIN_BG_GRAY,
															paddingVertical: 0
														}}
													>
														{child?.subDirections?.map((sub, indexSub) => {
															return (
																<TouchableOpacity
																	key={indexSub}
																	style={{
																		height: 40,
																		width: "100%",
																		justifyContent: "center"
																	}}
																	onPress={() => {
																		sheetRef.current.close();
																		navigation.navigate("MainDirServiceScreen", {
																			mainDirectionId: child.mainDirectionId,
																			directionId: [child.id],
																			subDirectionId: [sub.id],
																			fromCAT: false
																		});
																	}}
																>
																	<Text>{sub.name}</Text>
																</TouchableOpacity>
															);
														})}
													</ListItem>
												</ListItem.Accordion>
											);
										})}
									</View>
								</View>
							);
						})}
					</ScrollView>
				</View>
			</RBSheet>
		</TouchableOpacity>
	);
};

export default HomeSearch;

const styles = StyleSheet.create({
	searchContainer: {
		zIndex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: MAIN_COLOR_GRAY,
		borderRadius: MAIN_BORDER_RADIUS,
		height: 50,
		paddingLeft: 20,
		paddingRight: 10,
		marginTop: 10,
		marginHorizontal: 20,
		marginBottom: 10
	},
	filterText: {
		color: GRAY_ICON_COLOR,
		marginLeft: 10
	},
	filterBtn: {
		height: "100%",
		justifyContent: "center",
		width: 40,
		height: 40,
		alignItems: "center"
	},
	dirMainContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-start"
	},
	dirContainer: {
		flexGrow: 1,
		paddingHorizontal: 10,
		flexDirection: "column",
		paddingBottom: 40
	},
	eachDir: {
		flexDirection: "column",
		borderBottomWidth: 1,
		borderBottomColor: "#ebebeb",
		marginBottom: 10,
		paddingBottom: 10
	}
});
