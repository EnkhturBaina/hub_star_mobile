import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MainContext from "../../contexts/MainContext";
import { Icon } from "@rneui/base";

const HomeHeader = () => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const state = useContext(MainContext);

	useEffect(() => {
		state.getNotifications();
	}, [isFocused]);

	return (
		<View style={styles.headerContainer}>
			<Image style={styles.headerLogo} source={require("../../../assets/Logo.png")} />
			<View style={styles.headerIcons}>
				<TouchableOpacity
					style={{
						height: 30,
						width: 30,
						justifyContent: "center",
						marginRight: 10
					}}
					onPress={() => navigation.navigate("NotificationScreen")}
				>
					<Image
						style={{ width: "100%", height: "100%" }}
						source={
							state.notifications?.length > 0
								? require(`../../../assets/figma-icons/bell_badge.png`)
								: require(`../../../assets/figma-icons/bell.png`)
						}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("HistoryMainScreen")}
					style={{ height: 30, width: 30, justifyContent: "center", alignItems: "center" }}
				>
					<Icon name="file-tray-full-outline" type="ionicon" size={30} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		paddingTop: 10
	},
	headerLogo: {
		resizeMode: "contain",
		width: 120,
		height: 35
	},
	headerIcons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	}
});
