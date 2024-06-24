import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Icon } from "@rneui/base";
import { MAIN_COLOR } from "../../constant";
import Empty from "../../components/Empty";
import NotificationSkeleton from "../../components/Skeletons/NotificationSkeleton";
import "dayjs/locale/es";
import dayjs from "dayjs";
import MainContext from "../../contexts/MainContext";
import { i18n } from "../../refs/i18";

const Notification = (props) => {
	const state = useContext(MainContext);
	useLayoutEffect(() => {
		// TabBar Hide хийх
		props.navigation?.getParent()?.setOptions({
			tabBarStyle: {
				display: "none"
			}
		});
		return () =>
			props.navigation?.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					height: Platform.OS == "ios" ? 105 : 80,
					padding: 10
				}
			});
		// TabBar Hide хийх
	}, [props.navigation]);

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
			{state.notifications?.length == 0 && !loadinNotifications ? (
				<Empty text={i18n.t("emptyNotification")} />
			) : (
				state.notifications?.map((dtl, index2) => {
					return (
						<TouchableOpacity
							style={styles.cardContainer}
							key={index2}
							onPress={() =>
								props.navigation.navigate("PROFILE_NotificationDTLScreen", {
									adv_id: dtl.advertisement?.id,
									notif_data: dtl
								})
							}
						>
							<View
								style={{
									backgroundColor: dtl.isSeen ? "#f6f6f6" : "#fef4e8",
									padding: 10,
									borderRadius: 100,
									borderColor: "#aeaeae"
								}}
							>
								<Icon name="file-text" type="feather" size={28} color={dtl.isSeen ? "#aeaeae" : MAIN_COLOR} />
							</View>
							<View style={styles.textContainer}>
								<Text style={{ fontWeight: "bold" }} numberOfLines={2}>
									{dtl.description}
								</Text>
								<Text numberOfLines={3} style={{ flex: 1, color: "#aeaeae", fontWeight: "500" }}>
									{dayjs(dtl?.createdAt).format("YYYY-MM-DD HH:mm:ss") ?? "-"}
								</Text>
								<Text style={{ fontWeight: "500" }} numberOfLines={1}>
									{dtl.createdUser?.lastName?.substring(0, 1) + ". " + dtl.createdUser?.firstName}
								</Text>
							</View>
							{/* <Text
								style={{
									overflow: "hidden",
									fontWeight: "500",
									fontSize: 16,
									color: dtl.isSeen ? "aeaeae" : "##fff",
									backgroundColor: dtl.isSeen ? transparent : "MAIN_COLOR",
									borderRadius: 12,
									paddingHorizontal: 10,
									paddingVertical: 5
								}}
							>
								{dtl.date}
							</Text> */}
						</TouchableOpacity>
					);
				})
			)}
		</ScrollView>
	);
};

export default Notification;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
		backgroundColor: "#fff"
	},
	cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
		borderColor: "#DADADA"
	},
	textContainer: {
		flex: 1,
		flexDirection: "column",
		paddingHorizontal: 10
	}
});
