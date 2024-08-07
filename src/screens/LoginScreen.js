import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	StatusBar
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Icon, CheckBox } from "@rneui/themed";
import MainContext from "../contexts/MainContext";
import CustomSnackbar from "../components/CustomSnackbar";
// import talent_logo from "../../assets/talent_logo.png";
import splash_logo from "../../assets/splash_logo.png";
import { GRAY_ICON_COLOR, MAIN_BG_GRAY, MAIN_COLOR, MAIN_COLOR_GRAY, MAIN_DISABLED_BG } from "../constant";
import { Divider } from "@rneui/base";
import GradientButton from "../components/GradientButton";
import fb_logo from "../../assets/fb.png";
import google_logo from "../../assets/google.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { i18n } from "../refs/i18";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const LoginScreen = (props) => {
	const state = useContext(MainContext);
	// const [email, setEmail] = useState("ulziikhutag.gurensoft@gmail.com");
	// const [password, setPassword] = useState("WETITr");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [hidePassword, setHidePassword] = useState(true);

	const [isBiometricSupported, setIsBiometricSupported] = useState(false);

	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");
	const [rememberEmail, setRememberEmail] = useState(false);

	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	const onDismissSnackBar = () => setVisibleSnack(false);

	const hideShowPassword = () => {
		setHidePassword(!hidePassword);
	};

	useEffect(() => {
		// (async () => {
		//   const compatible = await LocalAuthentication.hasHardwareAsync();
		//   setIsBiometricSupported(compatible);

		//   await AsyncStorage.getItem("password").then(async (value) => {
		//     state.setPassword(value);
		//   });
		// })();

		AsyncStorage.getItem("login_email").then((res) => {
			if (res != null) {
				setEmail(res);
				setRememberEmail(true);
			}
		});
	}, []);

	useEffect(() => {}, []);

	const login = () => {
		if (email == "") {
			onToggleSnackBar(i18n.t("pleaseEnterEmail"));
		} else if (password == "") {
			onToggleSnackBar(i18n.t("pleaseEnterPassword"));
		} else {
			state.login(email, password, rememberEmail);
		}
		// state.setIsLoggedIn(true);
		// state.setIsLoading(false);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={{
				flex: 1,
				flexDirection: "column",
				backgroundColor: MAIN_BG_GRAY
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<CustomSnackbar
				visible={visibleSnack}
				dismiss={onDismissSnackBar}
				text={snackBarMsg}
				topPos={Platform.OS == "ios" ? 50 : 20}
			/>
			<TouchableOpacity
				onPress={() => props.navigation.navigate("LoginOrRegisterTab")}
				style={{ justifyContent: "flex-start", flexDirection: "row" }}
			>
				<Icon name="arrow-left" type="feather" size={30} style={{ paddingTop: 60, paddingLeft: 20 }} />
			</TouchableOpacity>
			<ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
				<Image
					style={{
						resizeMode: "contain",
						width: "40%",
						height: "40%",
						zIndex: 999,
						marginTop: 30
					}}
					source={splash_logo}
				/>
				<Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 15 }}>{i18n.t("loginScreen")}</Text>
				{state.errorMsg ? (
					<Text style={{ fontWeight: "bold", textAlign: "center", color: "red", marginBottom: 15 }}>
						{state.errorMsg}
					</Text>
				) : null}
				<View style={styles.stackSection}>
					<View style={styles.sectionStyle}>
						<Icon name="user" type="font-awesome" size={20} style={styles.inputIcon} color={GRAY_ICON_COLOR} />
						<TextInput
							style={styles.generalInput}
							value={email}
							placeholder={i18n.t("emailOrPhone")}
							keyboardType="email-address"
							returnKeyType="done"
							onChangeText={setEmail}
						/>
					</View>
					<View style={styles.sectionStyle}>
						<Icon name="lock" type="font-awesome" size={20} style={styles.inputIcon} color={GRAY_ICON_COLOR} />
						<TextInput
							placeholder={i18n.t("password")}
							value={password}
							onChangeText={setPassword}
							style={styles.generalInput}
							returnKeyType="done"
							secureTextEntry={hidePassword}
						/>
						<TouchableOpacity style={styles.imageStyle} onPress={() => hideShowPassword()}>
							<Icon name={hidePassword ? "eye" : "eye-closed"} type="octicon" color={GRAY_ICON_COLOR} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.stackSection2}>
					<CheckBox
						containerStyle={{
							padding: 0,
							margin: 0,
							marginLeft: 0,
							alignItems: "center",
							backgroundColor: MAIN_BG_GRAY
						}}
						textStyle={{
							fontWeight: "normal",
							marginLeft: 5
						}}
						title={i18n.t("remember")}
						checked={rememberEmail}
						onPress={() => setRememberEmail(!rememberEmail)}
						iconType="material-community"
						checkedIcon="checkbox-outline"
						uncheckedIcon="checkbox-blank-outline"
						checkedColor={MAIN_COLOR}
						uncheckedColor={MAIN_COLOR}
					/>
					<TouchableOpacity
						onPress={() => {
							if (email == "") {
								onToggleSnackBar(i18n.t("pleaseEnterEmail"));
							} else if (reg.test(email) === false) {
								onToggleSnackBar(i18n.t("pleaseEnterEmailCorrect"));
							} else {
								props.navigation.navigate("ResetPassword", {
									email: email
								});
							}
						}}
					>
						<Text style={{ color: "color: rgb(59 130 246)" }}>{i18n.t("forgotPassword")}</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", marginTop: 8 }}>
					<GradientButton text={i18n.t("login")} action={login} />
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ fontWeight: "500", marginVertical: 8 }}>{i18n.t("createAccount")}?</Text>
					<TouchableOpacity onPress={() => props.navigation.navigate("RegisterScreen")}>
						<Text style={{ color: "color: rgb(59 130 246)", marginLeft: 8 }}>{i18n.t("register")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: MAIN_BG_GRAY,
		alignItems: "center",
		paddingHorizontal: 20
	},
	stackSection: {
		width: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center"
	},
	generalInput: {
		width: "80%",
		height: 50
	},
	stackSection2: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%"
	},
	imageStyle: {
		position: "absolute",
		zIndex: 999,
		right: 0,
		alignSelf: "center",
		justifyContent: "center",
		height: 50,
		width: 50
	},
	sectionStyle: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: MAIN_DISABLED_BG,
		height: 50,
		margin: 10,
		width: "100%",
		borderRadius: 8
	},
	inputIcon: {
		marginLeft: 15,
		marginHorizontal: 10
	},
	socialBtn: {
		flexDirection: "row",
		backgroundColor: "#fff",
		paddingVertical: 4,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: MAIN_COLOR_GRAY,
		width: "48%",
		height: 50
	}
});
