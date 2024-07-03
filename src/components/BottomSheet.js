import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { MAIN_BORDER_RADIUS, MAIN_COLOR } from "../constant";
import { i18n } from "../refs/i18";
import { Searchbar } from "react-native-paper";

const BottomSheet = ({
	bodyText, //sheet -н text
	dragDown, //sheet -г доош чирж хаах
	backClick, //sheet -н гадна дарж хаах
	displayName, //Дамжуулсан Object -н харуулах field
	handle,
	action, // parent Fn
	lookUpType,
	actionKey,
	isLang,
	sheetTitle
}) => {
	const itemHeight = 40;
	const sheetRef = useRef(); //Bottomsheet
	const [heightBottomSheet, setHeightBottomSheet] = useState(0);
	const [searchVal, setSearchVal] = useState(null);

	useEffect(() => {
		if (bodyText && bodyText?.length > 10) {
			setHeightBottomSheet(400);
		} else if (bodyText && bodyText?.length == 0) {
			setHeightBottomSheet(bodyText?.length * itemHeight + 150);
		} else {
			setHeightBottomSheet(bodyText?.length * itemHeight + 100);
		}
	}, [handle]);

	useEffect(() => {
		bodyText && heightBottomSheet > 0 ? sheetRef.current.open() : null;
	}, [heightBottomSheet]);

	const functionCombined = (e) => {
		sheetRef.current.close();
		if (actionKey) {
			action(e[actionKey]);
		} else {
			action(e);
		}
	};

	return (
		<View>
			<RBSheet
				ref={sheetRef}
				height={heightBottomSheet}
				closeOnDragDown={dragDown} //sheet -г доош чирж хаах
				closeOnPressMask={backClick} //sheet -н гадна дарж хаах
				customStyles={{
					container: {
						backgroundColor: "#fff",
						flexDirection: "column",
						borderTopEndRadius: 16,
						borderTopStartRadius: 16
					},
					draggableIcon: {
						backgroundColor: "#000"
					}
				}}
				onClose={() => {
					setHeightBottomSheet(0);
				}}
			>
				{sheetTitle ? (
					<Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}>{sheetTitle}</Text>
				) : null}
				<Searchbar
					placeholder={i18n.t("search")}
					onChangeText={setSearchVal}
					value={searchVal}
					style={styles.searchBar}
					inputStyle={{ height: 40, minHeight: 0 }}
					elevation={0}
				/>
				<View style={styles.bottomSheetContainer}>
					<View style={styles.lookupcontainer}>
						<ScrollView
							contentContainerStyle={{
								backgroundColor: "#fff"
							}}
						>
							{bodyText?.length > 1 ? (
								bodyText
									?.filter((el) => el[displayName]?.toLowerCase().includes(searchVal?.toLowerCase()))
									?.map((el, index) => {
										return (
											<TouchableOpacity key={index} onPress={() => functionCombined(el)}>
												<Text style={styles.bottomSheetBodyLookup}>
													{isLang ? i18n.t(el[displayName]) : el[displayName]}
												</Text>
											</TouchableOpacity>
										);
									})
							) : bodyText?.length == 1 ? (
								<TouchableOpacity onPress={() => functionCombined(bodyText[0])}>
									<Text style={styles.bottomSheetBodyLookup}>
										{isLang ? i18n.t(bodyText[0]?.[displayName]) : bodyText[0]?.[displayName]}
									</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={() => {}} style={{ height: 40 }} disabled>
									<Text style={styles.bottomSheetBodyLookup}>{i18n.t("noResultsFound")}</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
				</View>
			</RBSheet>
		</View>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	bottomSheetContainer: {
		justifyContent: "center",
		backgroundColor: "#fff",
		paddingHorizontal: 20
	},
	lookupcontainer: {
		width: "100%",
		height: "100%",
		justifyContent: "flex-start",
		paddingBottom: Platform.OS == "ios" ? 100 : 45
	},
	bottomSheetBodyLookup: {
		flex: 1,
		fontWeight: "500",
		fontSize: 18,
		padding: 10,
		color: MAIN_COLOR
	},
	searchBar: {
		marginHorizontal: 20,
		backgroundColor: "#f0f0f0",
		borderRadius: MAIN_BORDER_RADIUS,
		marginTop: 5,
		elevation: 0,
		height: 40
	}
});
