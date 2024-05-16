import { StyleSheet, Text, TouchableOpacity, Platform, View, ActivityIndicator } from "react-native";
import React from "react";
import { GRADIENT_END, GRADIENT_START } from "../constant";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={props.action} disabled={props.disabled}>
			<LinearGradient
				colors={[GRADIENT_START, GRADIENT_END]}
				style={{
					borderRadius: props.radius ?? 12,
					height: props.height ?? 45,
					opacity: props.disabled ? 0.6 : 1
				}}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center", //Centered vertically
						alignItems: "center", //Centered horizontally
						flex: 1
					}}
				>
					<Text style={styles.btnText}>{props.text}</Text>
					{props.isWaiting && <ActivityIndicator color="#fff" />}
				</View>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default GradientButton;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 45,
		justifyContent: "center"
	},
	btnText: {
		fontWeight: "bold",
		fontSize: 18,
		color: "#fff",
		textAlign: "center",
		textAlignVertical: "center",
		paddingHorizontal: 8,
		height: 40,
		paddingVertical: Platform.OS == "ios" ? 10 : 0
	}
});
