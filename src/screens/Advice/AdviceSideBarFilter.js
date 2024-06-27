import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import MainContext from "../../contexts/MainContext";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { Icon, CheckBox } from "@rneui/base";
import axios from "axios";
import SideFIlterSkeleton from "../../components/Skeletons/SideFIlterSkeleton";
import Empty from "../../components/Empty";
import { i18n } from "../../refs/i18";

const AdviceSideBarFilter = (props) => {
	const state = useContext(MainContext);
	const [checked, setChecked] = useState({});

	const [loadingSideFilter, setLoadingSideFilter] = useState(false);
	const [sideFilterData, setSideFilterData] = useState([]);

	const getSideFilterData = async () => {
		setLoadingSideFilter(true);
		await axios
			.get(`${SERVER_URL}reference/direction`, {
				params: {
					mainDirectionId: state.selectedAdvice
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
				console.error("Error fetching Advice SideBarFilter:", error);
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
	}, [state.selectedAdvice]);

	useEffect(() => {
		var checkedItems = [];
		//Checkbox дарах үед CHECK хийгдсэнүүдээр хайх
		Object.keys(checked).forEach(function (key, index) {
			if (checked[key]) {
				checkedItems.push(key);
			}
		});

		props.setAdviceDataParams((prevState) => ({
			...prevState,
			directionIds: checkedItems
		}));
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
					<Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10 }}>{i18n.t("filter")}</Text>
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
					<Empty text={i18n.t("noResultsFound")} />
				) : (
					sideFilterData?.map((el, index) => {
						const checkedItem = checked[el.id];
						return (
							<CheckBox
								containerStyle={styles.checkboxContainerStyle}
								textStyle={styles.checkboxTextStyle}
								title={
									<View style={styles.checkboxTextContainer}>
										<Text style={{ width: "80%" }}>{el.name}</Text>
										<Text style={{ width: "8%" }}>{el.advices?.length}</Text>
									</View>
								}
								checked={checkedItem}
								onPress={() => {
									setChecked((prevState) => ({
										...prevState,
										[el.id]: !prevState[el.id]
									}));
								}}
								iconType="material-community"
								checkedIcon="checkbox-outline"
								uncheckedIcon="checkbox-blank-outline"
								checkedColor={MAIN_COLOR}
								uncheckedColor="#798585"
								key={el.id}
							/>
						);
					})
				)}
			</ScrollView>
		</View>
	);
};

export default AdviceSideBarFilter;

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
		flex: 1,
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
