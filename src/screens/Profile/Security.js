import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Linking,
	ScrollView,
	StatusBar,
	Platform
} from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MAIN_COLOR } from "../../constant";
import { Switch } from "react-native-paper";
import { i18n } from "../../refs/i18";

const Security = (props) => {
	const state = useContext(MainContext);

	const tabBarHeight = useBottomTabBarHeight();

	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const [isSwitchOn2, setIsSwitchOn2] = useState(false);
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
				<View style={styles.stackContainer}>
					<Text style={styles.stackText}>{i18n.t("rememberEmail")}</Text>
					<Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} color={MAIN_COLOR} />
				</View>
				<View style={styles.stackContainer}>
					<Text style={styles.stackText}>{i18n.t("readFaceId")}</Text>
					<Switch value={isSwitchOn2} onValueChange={() => setIsSwitchOn2(!isSwitchOn2)} color={MAIN_COLOR} />
				</View>
				<Button
					title={i18n.t("changePin")}
					color="transparent"
					radius={12}
					onPress={() => {}}
					titleStyle={{
						fontWeight: "bold",
						color: MAIN_COLOR
					}}
					buttonStyle={styles.btnContainer}
				/>
				<Button
					title={i18n.t("changePassword")}
					color="transparent"
					radius={12}
					onPress={() => {}}
					titleStyle={{
						fontWeight: "bold",
						color: MAIN_COLOR
					}}
					buttonStyle={styles.btnContainer}
				/>
			</ScrollView>
		</SafeAreaProvider>
	);
};

export default Security;

const styles = StyleSheet.create({
	stackContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10
	},
	stackText: {
		fontWeight: "500"
	},
	btnContainer: {
		height: 45,
		borderWidth: 2,
		borderColor: MAIN_COLOR,
		marginBottom: 15
	}
});
