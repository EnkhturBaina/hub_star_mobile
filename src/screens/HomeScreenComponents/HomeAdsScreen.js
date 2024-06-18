import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IMG_URL, MAIN_BORDER_RADIUS, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import AdvicesSkeleton from "../../components/Skeletons/AdvicesSkeleton";
import { useNavigation } from "@react-navigation/native";
import { i18n } from "../../refs/i18";

const HomeAdsScreen = () => {
	const state = useContext(MainContext);
	const navigation = useNavigation();

	return (
		<View>
			<Text style={styles.specialServiceText}>{i18n.t("simpleServices")}</Text>
			<View style={{ marginTop: 10 }}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1, paddingRight: 20, paddingBottom: 10 }}
				>
					{state.advertisement?.length == 0
						? null
						: state.advertisement.map((el, index) => {
								return (
									<TouchableOpacity
										key={index}
										style={[
											styles.mainServiceContainer,
											{
												marginLeft: index == 0 ? 20 : 10
											}
										]}
										onPress={() =>
											navigation.navigate("SingleHomeAdScreen", {
												adv_id: el.id
											})
										}
									>
										<ActivityIndicator size="small" style={styles.adviceImg} />
										<Image
											source={
												el.images[0]
													? {
															uri: IMG_URL + el.images[0]?.id
													  }
													: require("../../../assets/splash_bg_1.jpg")
											}
											resizeMode="cover"
											style={{
												height: 130,
												borderTopLeftRadius: 6,
												borderTopRightRadius: 6,
												backgroundColor: "#fff",
												width: 180
											}}
										/>
										<View style={{ flexDirection: "column", padding: 10 }}>
											<Text numberOfLines={2} style={{ fontSize: 16, fontWeight: "500", height: 40 }}>
												{el.title}
											</Text>
											<Text style={{ color: "#aeaeae", fontWeight: "500" }} numberOfLines={1}>
												{state.getTypeName(el.userType, el.specialService, (isSlash = false))}
											</Text>
										</View>
									</TouchableOpacity>
								);
						  })}
				</ScrollView>
			</View>
		</View>
	);
};

export default HomeAdsScreen;

const styles = StyleSheet.create({
	mainServiceContainer: {
		flex: 1,
		width: 180,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 6,
		flexDirection: "column",
		alignSelf: "flex-start"
	},
	mainServiceText: {
		fontWeight: "500",
		color: "#fff",
		textAlign: "center",
		fontSize: 20
	},
	specialServiceText: {
		fontWeight: "500",
		fontSize: 16,
		marginLeft: 20,
		marginTop: 10
	},
	adviceImg: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 120
	}
});
