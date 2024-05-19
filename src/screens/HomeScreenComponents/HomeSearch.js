import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	ScrollView,
	Image,
	Dimensions,
	TextInput
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import {
	GRAY_ICON_COLOR,
	IMG_URL,
	MAIN_BG_GRAY,
	MAIN_BORDER_RADIUS,
	MAIN_COLOR,
	MAIN_COLOR_GRAY
} from "../../constant";
import { Icon, ListItem } from "@rneui/base";
import RBSheet from "react-native-raw-bottom-sheet";
import MainContext from "../../contexts/MainContext";
import { useNavigation } from "@react-navigation/native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeSearch = () => {
	const navigation = useNavigation();
	const state = useContext(MainContext);
	const sheetRef = useRef(); //*****Bottomsheet
	const [expanded, setExpanded] = useState({});
	const [searchVal, setSearchVal] = useState("");

	const [selectedItem, setSelectedItem] = useState(null);

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
				onSelectItem={setSelectedItem}
				dataSet={state?.subDirectionData ?? null}
				containerStyle={{ width: "80%", backgroundColor: MAIN_COLOR_GRAY }}
				inputContainerStyle={{
					backgroundColor: MAIN_COLOR_GRAY
				}}
				renderItem={(item, text) => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("MainDirServiceScreen", {
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
			/>
			<TouchableOpacity style={styles.filterBtn} onPress={() => sheetRef.current.open()}>
				<Icon name="sliders" type="feather" size={20} color={GRAY_ICON_COLOR} />
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
			>
				<View style={styles.dirMainContainer}>
					<ScrollView nestedScrollEnabled contentContainerStyle={styles.dirContainer} bounces={false}>
						{state?.mainDirection?.map((el, index) => {
							var dirArr = [];
							var sub_dirArr = [];
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
		height: 40
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
