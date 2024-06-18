import { StatusBar, TouchableOpacity, Platform, StyleSheet, View, Text } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import MainContext from "../../contexts/MainContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { i18n } from "../../refs/i18";

const AddServiceFirst = (props) => {
	const state = useContext(MainContext);

	const handleChoose = (val) => {
		state.clearServiceData();
		state.setCurrentStep(1);
		if (props.route.params?.isFromPosted) {
			props.navigation.navigate(val ? "UPDATE_AddServiceSpecial" : "UPDATE_AddService");
		} else {
			props.navigation.navigate(val ? "AddServiceSpecial" : "AddService");
		}
	};

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingTop: 20
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<View style={{ flexDirection: "column", flex: 1 }}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => handleChoose(true)} style={styles.addItemContainer}>
					<Icon name="pluscircle" type="antdesign" size={70} color="#c5c5c5" />
					<Text style={{ fontSize: 18, color: "#919395" }}>{i18n.t("addSpecialService")}</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.7} onPress={() => handleChoose(false)} style={styles.addItemContainer}>
					<Icon name="pluscircle" type="antdesign" size={70} color="#c5c5c5" />

					<Text style={{ fontSize: 18, color: "#919395" }}>{i18n.t("addSimpleService")}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaProvider>
	);
};

export default AddServiceFirst;

const styles = StyleSheet.create({
	addItemContainer: {
		marginHorizontal: 20,
		alignItems: "center",
		height: 150,
		backgroundColor: "#e5e5e5",
		borderRadius: 6,
		marginBottom: 20,
		flexDirection: "column",
		justifyContent: "space-evenly"
	}
});
