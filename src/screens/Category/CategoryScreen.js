import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StatusBar,
	Platform,
	SafeAreaView,
	TextInput
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { GRAY_ICON_COLOR, IMG_URL, MAIN_BORDER_RADIUS, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import { Icon, ListItem } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

const CategoryScreen = () => {
	const navigation = useNavigation();
	const tabBarHeight = useBottomTabBarHeight();
	const isFocused = useIsFocused();
	const state = useContext(MainContext);

	const [expanded, setExpanded] = useState({});
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		setExpanded({});
	}, [isFocused]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Constants.statusBarHeight,
				backgroundColor: "#fff"
			}}
		>
			<AutocompleteDropdownContextProvider>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<View style={styles.stack1}>
					<TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => {}}>
						<View>
							<Image
								source={require("../../../assets/PersonCircle.png")}
								style={{ width: 50, height: 50, borderRadius: 50 }}
								resizeMode="contain"
							/>
						</View>
						<View style={{ flexDirection: "column", marginLeft: 10 }}>
							{state.lastName && state.firstName ? (
								<Text style={{ fontWeight: "500" }}>
									{state.lastName?.substr(0, 1)}. {state.firstName}
								</Text>
							) : (
								<Text style={styles.generalText}>Хэрэглэгч</Text>
							)}
							<Text style={{}}>ID дугаар: {state?.userId}</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.headerIcons}>
						<Icon name="bell" type="feather" size={23} style={{ marginRight: 10 }} onPress={() => console.log("X")} />
						<Icon name="chatbox-ellipses-outline" type="ionicon" size={25} onPress={() => console.log("X")} />
					</View>
				</View>
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
						containerStyle={{ width: "90%", backgroundColor: MAIN_COLOR_GRAY }}
						inputContainerStyle={{
							backgroundColor: MAIN_COLOR_GRAY
						}}
						emptyResultText="Үр дүн олдсонгүй."
						renderItem={(item, text) => (
							<TouchableOpacity
								onPress={() => {
									// console.log("item", item);
									navigation.navigate("CAT_MainDirServiceScreen", {
										mainDirectionId: item.mainDirectionId,
										directionId: [item.directionId],
										subDirectionId: [item.id],
										fromCAT: true
									});
								}}
							>
								<Text style={{ padding: 15 }}>{item.title}</Text>
							</TouchableOpacity>
						)}
						suggestionsListMaxHeight={300}
						textInputProps={{
							placeholder: "Хайх"
						}}
					/>
				</TouchableOpacity>
				<ScrollView
					nestedScrollEnabled
					contentContainerStyle={{
						flexGrow: 1,
						paddingHorizontal: 20,
						flexDirection: "column",
						paddingTop: 20,
						paddingBottom: tabBarHeight
					}}
					bounces={false}
				>
					{state?.mainDirection?.map((el, index) => {
						return (
							<View
								key={index}
								style={{
									flexDirection: "column",
									borderBottomWidth: 1,
									borderBottomColor: "#ebebeb",
									marginBottom: 10,
									paddingBottom: 10
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										paddingBottom: 3
									}}
								>
									<Image style={{ width: 20, height: 20 }} source={{ uri: IMG_URL + el?.logoId }} />
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
																color: checkOpen ? MAIN_COLOR : "#000",
																fontWeight: checkOpen ? "500" : "normal",
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
													paddingHorizontal: 3
												}}
											>
												<ListItem
													containerStyle={{
														flexDirection: "column",
														alignItems: "flex-start",
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
																	navigation.navigate("CAT_MainDirServiceScreen", {
																		mainDirectionId: el.id,
																		directionId: [child.id],
																		subDirectionId: [sub.id],
																		fromCAT: true
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
			</AutocompleteDropdownContextProvider>
		</SafeAreaView>
	);
};

export default CategoryScreen;

const styles = StyleSheet.create({
	stack1: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
		paddingTop: 10
	},
	headerIcons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},
	searchContainer: {
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
		marginBottom: 5
	},
	searchInput: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-start"
	}
});
