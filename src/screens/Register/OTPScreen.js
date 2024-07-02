import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { MAIN_BG_GRAY, MAIN_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import GradientButton from "../../components/GradientButton";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import CustomDialog from "../../components/CustomDialog";
import { i18n } from "../../refs/i18";

const CELL_COUNT = 6;

const OTPScreen = (props) => {
	const route = useRoute();

	const [errorMsg, setErrorMsg] = useState("");
	const [value, setValue] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [isWaiting, setIsWaiting] = useState(false);

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("success"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue
	});

	useEffect(() => {
		if (value?.length == 6) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [value]);

	const confirmOTP = () => {
		try {
			setIsWaiting(true);
			axios
				.post(
					`${SERVER_URL}authentication/verify/otp`,
					{
						otp: value,
						details: route.params?.details,
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
						setVisibleDialog(true);
						setDialogText(i18n.t("confirmationSuccess"));
					}
				})
				.catch(function (error) {
					setErrorMsg(error.response?.data?.message);
					if (error.response) {
						console.log("error.response", error.response.data);
					}
				})
				.finally(() => {
					setIsWaiting(false);
				});
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<View style={{ backgroundColor: MAIN_BG_GRAY, flex: 1, paddingHorizontal: 20 }}>
			<Text style={{ fontWeight: "bold", marginBottom: 20 }}>{i18n.t("pleaseCheckEmail")}</Text>
			<CodeField
				ref={ref}
				{...propss}
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
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
			{errorMsg ? <Text style={{ fontWeight: "bold", textAlign: "center", color: "red" }}>{errorMsg}</Text> : null}
			<View style={{ marginTop: 20 }}>
				<GradientButton
					text={i18n.t("confirmate")}
					action={() => confirmOTP()}
					// disabled={isDisabled}
					disabled={isWaiting || isDisabled ? true : false}
					isWaiting={isWaiting}
				/>
			</View>
			<CustomDialog
				visible={visibleDialog}
				confirmFunction={() => {
					setVisibleDialog(false);
					props.navigation.navigate("LoginScreen");
				}}
				declineFunction={() => {
					setVisibleDialog(false);
				}}
				text={dialogText}
				confirmBtnText={i18n.t("okey")}
				DeclineBtnText=""
				type={dialogType}
			/>
		</View>
	);
};

export default OTPScreen;

const styles = StyleSheet.create({
	codeFieldRoot: {
		marginVertical: 20,
		width: "auto",
		marginLeft: "auto",
		marginRight: "auto"
	},
	cellRoot: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderColor: MAIN_COLOR_GRAY,
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
