import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { GRADIENT_END, GRADIENT_START, MAIN_COLOR, MAIN_COLOR_GRAY } from "../constant";
import { LinearGradient } from "expo-linear-gradient";
import MainContext from "../contexts/MainContext";
import { i18n } from "../refs/i18";

export default function IntroSliderScreen(props) {
	const state = useContext(MainContext);
	const introData = [
		{
			id: 1,
			image: require("../../assets/intro/intro1.png"),
			text: "Бүгдийг нэг дороос"
		},
		{
			id: 2,
			image: require("../../assets/intro/intro2.png"),
			text: "Төслөө та өөрөө удирдаа"
		},
		{
			id: 3,
			image: require("../../assets/intro/intro3.png"),
			text: "Аз жаргалтай бүтээн байгуулалт"
		}
	];

	const _renderNextButton = () => {
		return (
			<LinearGradient
				colors={[GRADIENT_START, GRADIENT_END]}
				style={{
					borderRadius: 8,
					height: 40,
					width: 100,
					opacity: props.disabled ? 0.6 : 1,
					justifyContent: "center",
					alignItems: "center"
				}}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<Text style={styles.generalTextNextButton}>{i18n.t("next")}</Text>
			</LinearGradient>
		);
	};
	const _renderDoneButton = () => {
		return (
			<LinearGradient
				colors={[GRADIENT_START, GRADIENT_END]}
				style={{
					borderRadius: 8,
					height: 40,
					width: 100,
					opacity: props.disabled ? 0.6 : 1,
					justifyContent: "center",
					alignItems: "center"
				}}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<Text style={styles.generalTextNextButton}>{i18n.t("done")}</Text>
			</LinearGradient>
		);
	};
	const _renderSkipButton = () => {
		return (
			<View style={styles.introButton}>
				<Text style={styles.generalText}>{i18n.t("skip")}</Text>
			</View>
		);
	};

	const _renderItem = ({ item, index }) => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "space-evenly"
				}}
			>
				<Image
					source={item.image}
					style={{
						width: "100%",
						height: 250,
						resizeMode: "contain"
					}}
				/>
				<Text
					style={{
						textAlign: "center",
						fontSize: 30,
						fontWeight: "bold",
						color: MAIN_COLOR
					}}
				>
					{item.text}
				</Text>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			<AppIntroSlider
				data={introData}
				renderItem={_renderItem}
				renderSkipButton={_renderSkipButton}
				renderDoneButton={_renderDoneButton}
				renderNextButton={_renderNextButton}
				dotStyle={styles.dotStyle}
				activeDotStyle={styles.activeDotStyle}
				showSkipButton
				onDone={() => {
					state.setIsIntroShow(false), props.navigation.navigate("LoginOrRegisterTab");
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	dotStyle: {
		backgroundColor: "#D1D5DB",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15
	},
	activeDotStyle: {
		backgroundColor: MAIN_COLOR,
		width: 40,
		marginBottom: 15
	},
	introButton: {
		backgroundColor: MAIN_COLOR_GRAY,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		height: 40,
		width: 100
	},
	generalText: {
		// fontFamily: FONT_FAMILY_BOLD,
	},
	generalTextNextButton: {
		color: "#fff",
		fontWeight: "800"
		// fontFamily: FONT_FAMILY_BOLD,
	}
});
