import { SafeAreaView, StyleSheet, Text, Platform, StatusBar, KeyboardAvoidingView, Pressable } from "react-native";
import React, { memo, useCallback, useContext, useRef, useState } from "react";
import Empty from "../../components/Empty";
import { MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import Constants from "expo-constants";

const ChatScreen = memo(() => {
	const state = useContext(MainContext);
	const [searchQuery, setSearchQuery] = useState("");
	const [loadingSideFilter, setLoadingSideFilter] = useState(false);
	const [sideFilterData, setSideFilterData] = useState([]);
	const dropdownController = useRef(null);
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
		return array.map((item) => {
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
				console.log("get SideFilterData response", JSON.stringify(response.data.response));
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
				console.log("sideFilterData", sideFilterData);
				setLoadingSideFilter(false);
			});
	}, []);
	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView
				style={{
					flex: 1,
					paddingTop: Constants.statusBarHeight,
					backgroundColor: "#fff"
				}}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
					{/* <Empty text="Тун удахгүй" /> */}
					<AutocompleteDropdown
						controller={(controller) => {
							dropdownController.current = controller;
						}}
						loading={loadingSideFilter}
						clearOnFocus={false}
						dataSet={sideFilterData}
						containerStyle={{ flexGrow: 1, flexShrink: 1, backgroundColor: MAIN_COLOR_GRAY }}
						inputContainerStyle={{
							backgroundColor: MAIN_COLOR_GRAY
						}}
						onChangeText={(e) => {
							getSideFilterData(e);
						}}
						emptyResultText="Үр дүн олдсонгүй."
						renderItem={(item, text) => {
							console.log("item", item);
							return (
								<Pressable
									onPress={() => {
										console.log("X");
									}}
								>
									<Text style={{ padding: 15 }}>{item.title}</Text>
								</Pressable>
							);
						}}
						suggestionsListMaxHeight={300}
						textInputProps={{
							placeholder: "Хайх"
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
				</KeyboardAvoidingView>
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
	);
});

export default ChatScreen;

const styles = StyleSheet.create({});
