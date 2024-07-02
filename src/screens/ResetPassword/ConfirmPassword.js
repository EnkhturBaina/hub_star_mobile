import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { MAIN_BG_GRAY, MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { Button } from "@rneui/base";
import { useHeaderHeight } from "@react-navigation/elements";
import confirm from "../../../assets/password/confirm.png";
import axios from "axios";
import { i18n } from "../../refs/i18";

const CELL_COUNT = 6;

const ConfirmPassword = (props) => {
	const headerHeight = useHeaderHeight();

	const [errorMsg, setErrorMsg] = useState("");

	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
	const [value, setValue] = useState("");
	const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue
	});

	useEffect(() => {}, []);
	useEffect(() => {
		//Баталгаажуулах код оруулсан button Идэвхтэй болгох
		setConfirmButtonDisabled(value?.length == 6 ? false : true);
	}, [value]);

	const confirmOTP = () => {
		try {
			axios
				.post(
					`${SERVER_URL}authentication/verify/otp`,
					{
						otp: value,
						details: props?.route.params?.details_prop,
						type: "Forget"
					},
					{
						headers: {
							"Content-Type": "application/json",
							"x-api-key": X_API_KEY
						}
					}
				)
				.then(async (response) => {
					// console.log("confirm OTP", response.data);
					if (response.data?.statusCode == 200) {
						// props.navigation.navigate("BioScreen");
						props.navigation.navigate("ChangePassword", {
							email_prop: response.data.response?.email,
							access_token: response.data.response?.accessToken
						});
					}
				})
				.catch(function (error) {
					console.log("error.response", error.response.data);
					if (error.response.data.message) {
						setErrorMsg(error.response.data.message);
					}
				});
		} catch (error) {
			// console.log("error", error);
		}
	};
	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={headerHeight}
			behavior={Platform.OS == "ios" ? "padding" : ""}
			style={{
				flex: 1
			}}
		>
			<ScrollView
				keyboardShouldPersistTaps="always" // INPUT -с гадна дарахад keep keyboard open
				bounces={false}
				contentContainerStyle={styles.mainContainer}
				automaticallyAdjustKeyboardInsets={true}
			>
				<Text style={{ fontWeight: "500" }}>
					{i18n.t("sendConfirmOTP1")} <Text style={{ fontWeight: "bold" }}>{props.route?.params?.email_prop}</Text>{" "}
					{i18n.t("sendConfirmOTP2")}
				</Text>
				{errorMsg ? <Text style={{ fontWeight: "bold", textAlign: "center", color: "red" }}>{errorMsg}</Text> : null}

				<Image source={confirm} resizeMode="contain" style={{ width: "100%", height: 150 }} />
				<CodeField
					ref={ref}
					{...propss}
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					autoFocus={true}
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<View
							onLayout={getCellOnLayoutHandler(index)}
							key={index}
							style={[styles.cellRoot, isFocused && styles.focusCell]}
						>
							<Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
						</View>
					)}
				/>
				{/* <TouchableOpacity>
					<Text
						style={{
							fontWeight: "500",
							textAlign: "center"
						}}
					>
						Дахин илгээх үү? 00:30
					</Text>
				</TouchableOpacity> */}
				<Button
					containerStyle={{ marginTop: 10 }}
					title={i18n.t("confirmate")}
					color={MAIN_COLOR}
					radius={12}
					onPress={() => {
						confirmOTP();
					}}
					titleStyle={{
						fontWeight: "bold"
					}}
					buttonStyle={{ height: 45 }}
					disabled={confirmButtonDisabled}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ConfirmPassword;

const styles = StyleSheet.create({
	mainContainer: {
		flexGrow: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: "space-around"
	},
	codeFieldRoot: {
		marginLeft: "auto",
		marginRight: "auto"
	},
	cellRoot: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderColor: MAIN_BG_GRAY,
		borderWidth: 1,
		borderRadius: 8,
		marginRight: 5
	},
	cellText: {
		color: "#000",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center"
	},
	focusCell: {
		borderColor: MAIN_COLOR,
		borderWidth: 2
	}
});
