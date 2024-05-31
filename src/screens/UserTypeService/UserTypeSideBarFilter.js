import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import MainContext from "../../contexts/MainContext";
import { IMG_URL, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { Icon, ListItem } from "@rneui/base";
import axios from "axios";
import SideFIlterSkeleton from "../../components/Skeletons/SideFIlterSkeleton";
import Empty from "../../components/Empty";

const UserTypeSideBarFilter = (props) => {
	const state = useContext(MainContext);
	const [checked, setChecked] = useState({});

	const [loadingSideFilter, setLoadingSideFilter] = useState(false);
	const [sideFilterData, setSideFilterData] = useState([]);
	const [expanded, setExpanded] = useState({});

	const getSideFilterData = async () => {
		setLoadingSideFilter(true);
		await axios
			.get(`${SERVER_URL}reference/main-direction`, {
				params: {
					userType: state.selectedUserType
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get SideFilterData response",
				//   JSON.stringify(response.data.response)
				// );
				setSideFilterData(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching UserTypeSideBarFilter=>getSideFilterData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingSideFilter(false);
			});
	};
	useEffect(() => {
		getSideFilterData();
	}, []);
	useEffect(() => {
		getSideFilterData();
	}, [state.selectedUserType]);

	useEffect(() => {
		props.listEndFnc(false);
		props.listData([]);
		var checkedItems = [];
		//Checkbox дарах үед CHECK хийгдсэнүүдээр хайх
		Object.keys(checked).forEach(function (key, index) {
			if (checked[key]) {
				checkedItems.push(key);
			}
		});

		if (checkedItems.length == 0) {
			state.setUserTypeParam((prevState) => ({
				...prevState,
				page: 1,
				directionIds: null,
				subDirectionIds: null
			}));
		} else {
			const currentDirections = sideFilterData?.filter((item) => {
				return item.directions?.some((subdir) => checkedItems.includes(subdir.id));
			});

			state.setUserTypeParam((prevState) => ({
				...prevState,
				page: 1,
				limit: 10,
				directionIds: currentDirections?.map((item) => item.id),
				subDirectionIds: checkedItems
			}));
		}
	}, [checked]);

	return (
		<View
			style={{
				backgroundColor: "#fff",
				flex: 1,
				padding: 10,
				borderRightWidth: 1,
				borderRightColor: "#aeaeae"
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					paddingBottom: 10
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Icon name="options" type="ionicon" size={23} />
					<Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10 }}>Шүүлтүүр</Text>
				</View>
				<Icon name="chevron-left" type="feather" size={23} onPress={() => props.setIsOpen(false)} />
			</View>
			<Divider />
			<ScrollView
				nestedScrollEnabled
				contentContainerStyle={styles.dirContainer}
				bounces={false}
				showsVerticalScrollIndicator={false}
			>
				{sideFilterData?.length == 0 && loadingSideFilter ? (
					<SideFIlterSkeleton />
				) : sideFilterData?.length == 0 && !loadingSideFilter ? (
					<Empty text="Үр дүн олдсонгүй." />
				) : (
					sideFilterData?.map((el, index) => {
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
													paddingHorizontal: 3
												}}
											>
												<ListItem
													containerStyle={{
														flexDirection: "column",
														alignItems: "flex-start"
													}}
												>
													{child?.subDirections?.map((sub, indexSub) => {
														return (
															<View
																key={indexSub}
																style={{
																	marginBottom: 20
																}}
															>
																<Text>{sub.name}</Text>
															</View>
														);
													})}
												</ListItem>
											</ListItem.Accordion>
										);
									})}
								</View>
							</View>
						);
					})
				)}
			</ScrollView>
		</View>
	);
};

export default UserTypeSideBarFilter;

const styles = StyleSheet.create({
	dirContainer: {
		flexGrow: 1,
		flexDirection: "column",
		paddingTop: 10
	},
	eachDir: {
		flexDirection: "column",
		borderBottomWidth: 1,
		borderBottomColor: "#ebebeb",
		marginBottom: 10,
		paddingBottom: 10
	}
});
