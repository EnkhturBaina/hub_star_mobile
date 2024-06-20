import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	TextInput,
	Platform,
	KeyboardAvoidingView
} from "react-native";
import React, { useState, useEffect } from "react";
import change from "../../../assets/password/change.png";
import { MAIN_BORDER_RADIUS, MAIN_COLOR, MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import { Button, Icon } from "@rneui/base";
import { useHeaderHeight } from "@react-navigation/elements";
import axios from "axios";
import CustomDialog from "../../components/CustomDialog";
import { i18n } from "../../refs/i18";

const ChangePassword = (props) => {
	const headerHeight = useHeaderHeight();
	const [errorMsg, setErrorMsg] = useState("");

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogText, setDialogText] = useState(""); //Dialog -н текст

	const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const [hideNewPassword, setNewHidePassword] = useState(true);
	const [hideRepeatPassword, setRepeatHidePassword] = useState(true);

	const [passwordLengthValid, setPasswordLengthValid] = useState(false); //Нууц үг 8 болон түүнээс дээш тэмдэг
	const [passwordUpperValid, setPasswordUpperValid] = useState(false); //Нууц үг Багадаа 1 том үсэг
	const [passwordCharValid, setPasswordCharValid] = useState(false); //Нууц үг 1 тусгай тэмдэгт эсвэл 1 тоо (!@#$%^&*_)
	const [matchPassword, setMatchPassword] = useState(false); //Нууц үг таарч буй эсэх

	var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern
	var regexChar = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

	const hideShowNewPassword = () => {
		setNewHidePassword(!hideNewPassword);
	};
	const hideShowRepeatPassword = () => {
		setRepeatHidePassword(!hideRepeatPassword);
	};

	//Нууц үг оруулахад Validation шалгах
	const handlePassword = (e) => {
		setNewPassword(e);
		e != repeatPassword ? setMatchPassword(false) : setMatchPassword(true);
		e?.length >= 8 ? setPasswordLengthValid(true) : setPasswordLengthValid(false);

		regex.test(e) ? setPasswordUpperValid(true) : setPasswordUpperValid(false);
		regexChar.test(e) ? setPasswordCharValid(true) : setPasswordCharValid(false);
	};
	//Нууц үг давтахад таарж буй эсэхийг шалгах
	const handleRepeatPassword = (e) => {
		setRepeatPassword(e);
		e != newPassword && passwordLengthValid && passwordCharValid && passwordUpperValid
			? setMatchPassword(false)
			: setMatchPassword(true);
	};
	useEffect(() => {
		//Баталгаажуулах код, Нууц үг Validation БҮГД таарсан үед ҮРГЭЛЖЛҮҮЛЭХ button Идэвхтэй болгох
		setConfirmButtonDisabled(
			repeatPassword && matchPassword && passwordLengthValid && passwordCharValid && passwordUpperValid ? false : true
		);
	}, [repeatPassword, matchPassword, passwordLengthValid, passwordCharValid, passwordUpperValid]);

	const ChangePasswordReset = () => {
		try {
			axios
				.post(
					`${SERVER_URL}authentication/change-password`,
					{
						email: props.route?.params?.email_prop?.toLowerCase(),
						token: props.route?.params?.access_token,
						password: repeatPassword
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
						setErrorMsg("");
						setVisibleDialog(true);
						setDialogText(i18n.t("successPasswordReset"));
					}
				})
				.catch(function (error) {
					setErrorMsg(error.response?.data?.message);
					if (error.response) {
						// console.log("error.response", error.response.data);
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
			<ScrollView bounces={false} contentContainerStyle={styles.mainContainer} automaticallyAdjustKeyboardInsets={true}>
				{errorMsg ? <Text className="font-bold text-center text-red-500">{errorMsg}</Text> : null}
				<Image source={change} resizeMode="contain" style={{ width: "100%", height: 200 }} />
				<Text style={styles.topText}>Шинэ нууц үгээ оруулна уу?</Text>
				<View style={styles.sectionStyle}>
					<Icon name="key" type="ionicon" size={20} color={MAIN_COLOR_GRAY} style={styles.inputIcon} />
					<TextInput
						placeholder="Нууц үг"
						value={newPassword}
						onChangeText={(e) => {
							handlePassword(e);
						}}
						style={styles.generalInput}
						returnKeyType="done"
						secureTextEntry={hideNewPassword}
					/>
					<TouchableOpacity style={styles.imageStyle} onPress={() => hideShowNewPassword()}>
						<Icon name={hideNewPassword ? "eye" : "eye-closed"} type="octicon" color={MAIN_COLOR} />
					</TouchableOpacity>
				</View>
				<Text
					style={[
						styles.passwordValidText,
						{
							color: passwordLengthValid ? MAIN_COLOR : "red"
						}
					]}
				>
					• 8 болон түүнээс дээш тэмдэг
				</Text>
				<Text style={[styles.passwordValidText, { color: passwordUpperValid ? MAIN_COLOR : "red" }]}>
					• Багадаа 1 том үсэг
				</Text>
				<Text style={[styles.passwordValidText, { color: passwordCharValid ? MAIN_COLOR : "red" }]}>
					• 1 тусгай тэмдэгт эсвэл 1 тоо (!@#$%^&*_)
				</Text>
				<Text style={[styles.passwordValidText, { color: matchPassword ? MAIN_COLOR : "red" }]}>
					• Нууц үг таарахгүй байна.
				</Text>
				<View style={styles.sectionStyle}>
					<Icon name="key" type="ionicon" size={20} color={MAIN_COLOR_GRAY} style={styles.inputIcon} />
					<TextInput
						placeholder="Нууц үг давтах"
						value={repeatPassword}
						onChangeText={(e) => {
							handleRepeatPassword(e);
						}}
						style={styles.generalInput}
						returnKeyType="done"
						secureTextEntry={hideRepeatPassword}
					/>
					<TouchableOpacity style={styles.imageStyle} onPress={() => hideShowRepeatPassword()}>
						<Icon name={hideRepeatPassword ? "eye" : "eye-closed"} type="octicon" color={MAIN_COLOR} />
					</TouchableOpacity>
				</View>
				<Button
					containerStyle={styles.btnContainer}
					title="Баталгаажуулах"
					color={MAIN_COLOR}
					radius={12}
					onPress={() => {
						ChangePasswordReset();
					}}
					titleStyle={{
						fontWeight: "bold"
					}}
					buttonStyle={{ height: 45 }}
					disabled={confirmButtonDisabled}
				/>
				<CustomDialog
					visible={visibleDialog}
					confirmFunction={() => {
						setVisibleDialog(false);
						props.navigation.navigate("LoginScreen");
					}}
					declineFunction={() => {}}
					text={dialogText}
					confirmBtnText={i18n.t("close")}
					DeclineBtnText=""
					type="success"
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ChangePassword;

const styles = StyleSheet.create({
	mainContainer: {
		flexGrow: 1,
		backgroundColor: "#fff",
		paddingVertical: 10
	},
	sectionStyle: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 0.5,
		borderColor: MAIN_COLOR_GRAY,
		height: 50,
		borderRadius: MAIN_BORDER_RADIUS,
		margin: 10,
		marginRight: "auto",
		marginLeft: "auto",
		width: "80%"
	},
	inputIcon: {
		marginLeft: 15,
		marginHorizontal: 10
	},
	generalInput: {
		width: "80%",
		height: 50
	},
	imageStyle: {
		position: "absolute",
		zIndex: 999,
		right: "5%"
	},
	passwordValidText: {
		fontWeight: "bold",
		fontSize: 14,
		width: "80%",
		marginRight: "auto",
		marginLeft: "auto"
	},
	topText: {
		fontWeight: "bold",
		width: "80%",
		marginTop: 50,
		marginRight: "auto",
		marginLeft: "auto"
	},
	btnContainer: {
		marginRight: "auto",
		marginLeft: "auto",
		marginTop: 10,
		width: "80%"
	}
});
