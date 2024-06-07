import { StyleSheet, View, StatusBar, Platform } from "react-native";
import React, { useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import GradientButton from "../../components/GradientButton";
import { MAIN_COLOR } from "../../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n, changeLanguage, deviceLanguage } from "../../refs/i18";
import * as Updates from "expo-updates";

const Language = (props) => {
	const [lang, setLang] = useState(i18n.locale);
	const tabBarHeight = useBottomTabBarHeight();

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<View style={{ marginHorizontal: 10 }}>
				<RadioButton.Group
					onValueChange={(newValue) => {
						setLang(newValue);
					}}
					value={lang}
				>
					<RadioButton.Item value="mn" mode="android" label="Монгол (MN)" color={MAIN_COLOR} />
					<RadioButton.Item value="en" mode="android" label="English (EN)" color={MAIN_COLOR} />
					<RadioButton.Item value="zh" mode="android" label="Chinese (ZH)" color={MAIN_COLOR} />
				</RadioButton.Group>
			</View>
			<View className="w-full mt-2 px-5">
				<GradientButton
					text="Хадгалах"
					action={async () => {
						try {
							changeLanguage(lang);
							await AsyncStorage.setItem("local_locale", lang).then(() => {
								Updates.reloadAsync();
							});
						} catch (error) {
							// console.log("ER", error);
						}
					}}
				/>
			</View>
		</SafeAreaProvider>
	);
};

export default Language;

const styles = StyleSheet.create({});
