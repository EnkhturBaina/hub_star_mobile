import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Badge, Icon } from "@rneui/base";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MainContext from "../../contexts/MainContext";
import { MAIN_COLOR } from "../../constant";

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
						height: 40,
						width: 40,
						justifyContent: "center",
						marginRight: 10
					}}
					onPress={() => navigation.navigate("NotificationScreen")}
				>
					<Icon name="bell" type="feather" size={28} />
					<Badge
						status="success"
						value={state.notifications?.length > 0 ? state.notifications?.filter((el) => !el.isSeen)?.length : 0}
						containerStyle={{ position: "absolute", top: 0, left: 20 }}
						badgeStyle={{ backgroundColor: MAIN_COLOR }}
					/>
				</TouchableOpacity>
				<Icon
					name="chatbox-ellipses-outline"
					type="ionicon"
					size={30}
					onPress={() => navigation.navigate("HistoryMainScreen")}
				/>
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
