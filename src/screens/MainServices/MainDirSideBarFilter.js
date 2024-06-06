import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import MainContext from "../../contexts/MainContext";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { Icon, CheckBox, ListItem } from "@rneui/base";
import axios from "axios";
import SideFIlterSkeleton from "../../components/Skeletons/SideFIlterSkeleton";
import Empty from "../../components/Empty";

const MainDirSideBarFilter = (props) => {
	const state = useContext(MainContext);
	const [checked, setChecked] = useState({});
	const [expanded, setExpanded] = useState({});

	const [loadingSideFilter, setLoadingSideFilter] = useState(false);
	const [sideFilterData, setSideFilterData] = useState([]);

	const getSideFilterData = async () => {
		setLoadingSideFilter(true);
		await axios
			.get(`${SERVER_URL}reference/direction`, {
				params: {
					mainDirectionId: props.mainDirId
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
				console.error("Error fetching get SideFilterData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				setLoadingSideFilter(false);
			});
	};
	useEffect(() => {
		sideFilterData?.length == 0 && getSideFilterData();
		//HomeScreen -с сонгож орсон DIR -г checked болгох
		setChecked((prevState) => ({
			...prevState,
			[props.subDir]: true
		}));
	}, []);

	useEffect(() => {
		props.listEndFnc(false);
		props.listData([]);
		var checkedItems = [];
		//Checkbox дарах үед CHECK хийгдсэнүүдээр хайх
		Object.keys(checked).forEach(function (key, index) {
			if (checked[key]) {
				checkedItems.push(parseInt(key));
			}
		});

		if (checkedItems.length == 0) {
			state.setMainDirParams((prevState) => ({
				...prevState,
				page: 1
			}));
		} else {
			if (sideFilterData.length > 0) {
				const currentDirections = sideFilterData?.filter((item) => {
					return item.subDirections?.some((subdir) => checkedItems?.includes(subdir.id));
				});
				state.setMainDirParams((prevState) => ({
					...prevState,
					page: 1,
					mainDirectionId: props.mainDirId,
					directionIds: currentDirections?.map((item) => item.id),
					subDirectionIds: checkedItems
				}));
			}
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
						const checkOpen = expanded[index];
						return (
							<ListItem.Accordion
								noIcon={el?.subDirections != "" ? false : true}
								key={index}
								content={
									<ListItem.Content>
										<ListItem.Title
											style={{
												color: checkOpen ? MAIN_COLOR : "#6f7275",
												fontWeight: "500",
												marginBottom: 5
											}}
										>
											{el.name}
										</ListItem.Title>
									</ListItem.Content>
								}
								isExpanded={checkOpen}
								onPress={() => {
									el?.subDirections != "" &&
										setExpanded((prevState) => ({
											// ...prevState,
											[index]: !prevState[index]
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
										padding: 0
									}}
								>
									{el?.subDirections?.map((sub, indexSub) => {
										const checkedItem = checked[sub.id];
										return (
											<CheckBox
												containerStyle={styles.checkboxContainerStyle}
												textStyle={styles.checkboxTextStyle}
												title={
													<View style={styles.checkboxTextContainer}>
														<Text style={{ width: "80%" }}>{sub.name}</Text>
														<Text style={{ width: "8%" }}>{sub.advertisements?.length}</Text>
													</View>
												}
												checked={checkedItem}
												onPress={() => {
													setChecked((prevState) => ({
														...prevState,
														[sub.id]: !prevState[sub.id]
													}));
												}}
												iconType="material-community"
												checkedIcon="checkbox-outline"
												uncheckedIcon="checkbox-blank-outline"
												checkedColor={MAIN_COLOR}
												uncheckedColor="#798585"
												key={sub.id}
											/>
										);
									})}
								</ListItem>
							</ListItem.Accordion>
						);
					})
				)}
			</ScrollView>
		</View>
	);
};

export default MainDirSideBarFilter;

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
	},
	checkboxContainerStyle: {
		padding: 0,
		margin: 0,
		marginLeft: 0,
		marginBottom: 10
	},
	checkboxTextContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 5
	},
	checkboxTextStyle: {
		color: "#798585",
		fontWeight: "500",
		marginLeft: 5
	},
	filterRowData: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 3
	},
	filterRowDataTitle: {
		fontWeight: "bold",
		textTransform: "uppercase",
		marginLeft: 5
	}
});
