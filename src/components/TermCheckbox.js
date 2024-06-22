import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CheckBox } from "@rneui/base";
import { i18n } from "../refs/i18";
import MainContext from "../contexts/MainContext";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../constant";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "@rneui/themed";
import axios from "axios";
import Empty from "./Empty";
import WebView from "react-native-webview";

const TermCheckbox = () => {
	const state = useContext(MainContext);
	const refRBSheet = useRef();
	const screen = Dimensions.get("screen");
	const [termData, setTermData] = useState(null);

	const getTermData = async () => {
		await axios
			.get(`${SERVER_URL}reference/pages/TERM_OF_SERVICE`, {
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log("get TermData response", JSON.stringify(response.data.response));
				setTermData(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching STEP1 get Directions:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	useEffect(() => {
		getTermData();
	}, []);

	return (
		<View>
			<CheckBox
				containerStyle={{
					padding: 0,
					marginLeft: 0,
					marginTop: 10
				}}
				textStyle={{
					fontWeight: "bold",
					marginLeft: 5
				}}
				title={i18n.t("confirmTerm")}
				checked={state.serviceData?.isTermOfService}
				onPress={() => {
					refRBSheet.current.open();
				}}
				iconType="material-community"
				checkedIcon="checkbox-outline"
				uncheckedIcon="checkbox-blank-outline"
				checkedColor={MAIN_COLOR}
				uncheckedColor={MAIN_COLOR}
			/>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={true}
				dragFromTopOnly={true}
				height={screen.height - 200}
				customStyles={{
					wrapper: {
						backgroundColor: "rgba(52, 52, 52, 0.8)"
					},
					container: {
						flexDirection: "column",
						borderTopStartRadius: 16,
						borderTopEndRadius: 16
					},
					draggableIcon: {
						backgroundColor: "#000"
					}
				}}
			>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						paddingBottom: 10,
						marginHorizontal: 20
					}}
				>
					{termData != null ? (
						<WebView originWhitelist={["*"]} source={{ html: termData.body }} style={{ flex: 1 }} />
					) : (
						<Empty text={i18n.t("noResultsFound")} />
					)}
				</ScrollView>
				<View
					style={{
						width: "90%",
						marginLeft: "auto",
						marginRight: "auto",
						marginBottom: 20
					}}
				>
					<Button
						onPress={() => {
							state.setServiceData((prevState) => ({
								...prevState,
								isTermOfService: true
							}));
							refRBSheet.current.close();
						}}
						title={i18n.t("confirm")}
						color={MAIN_COLOR}
						radius={12}
					/>
				</View>
			</RBSheet>
		</View>
	);
};

export default TermCheckbox;

const styles = StyleSheet.create({});
