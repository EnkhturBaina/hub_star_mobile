import { SafeAreaView, StyleSheet, Text, Platform, StatusBar, KeyboardAvoidingView, Pressable } from "react-native";
import React, { memo, useCallback, useContext, useRef, useState } from "react";
import Empty from "../../components/Empty";
import { MAIN_COLOR_GRAY, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import Constants from "expo-constants";
import { i18n } from "../../refs/i18";

const ChatScreen = memo(() => {
	const state = useContext(MainContext);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Constants.statusBarHeight,
				backgroundColor: "#fff"
			}}
		>
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<Empty text={i18n.t("comingSoon")} />
		</SafeAreaView>
	);
});

export default ChatScreen;

const styles = StyleSheet.create({});
