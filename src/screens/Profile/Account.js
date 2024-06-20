import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Platform } from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GRAY_ICON_COLOR, MAIN_BORDER_RADIUS, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import { i18n } from "../../refs/i18";

const Account = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();
	const onToggleSwitch = () => {
		onToggleSnackBar("Ирц бүртгэл сануулах тохиргоо хийгдлээ");
	};

	const [visibleDialog, setVisibleDialog] = useState(false); //Dialog харуулах
	const [dialogType, setDialogType] = useState("warning"); //Dialog харуулах төрөл
	const [dialogText, setDialogText] = useState("Апп -с гарах уу?"); //Dialog -н текст

	const [visibleSnack, setVisibleSnack] = useState(false);
	const [snackBarMsg, setSnackBarMsg] = useState("");

	//Snacbkbar харуулах
	const onToggleSnackBar = (msg) => {
		setVisibleSnack(!visibleSnack);
		setSnackBarMsg(msg);
	};

	//Snacbkbar хаах
	const onDismissSnackBar = () => setVisibleSnack(false);

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
				<TouchableOpacity style={styles.cardContainer}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Icon name="card" type="ionicon" color={MAIN_COLOR} size={25} style={{ marginHorizontal: 5 }} />
						<Text>**** **** **** 1234</Text>
					</View>
					<Text style={{ fontWeight: "500", color: MAIN_COLOR }}>{i18n.t("connected")}</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaProvider>
	);
};

export default Account;

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 8,
		justifyContent: "space-between"
	}
});
