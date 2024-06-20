import { StyleSheet, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { i18n } from "../refs/i18";

export default function ({ visible, dismiss, text, topPos }) {
	return (
		<Snackbar
			visible={visible}
			onDismiss={dismiss}
			wrapperStyle={{ top: topPos ? topPos : 50, zIndex: 9999 }}
			duration={2000}
			style={{ backgroundColor: "#89898c" }}
			action={{
				label: i18n.t("close"),
				onPress: () => {
					// Do something
				}
			}}
		>
			<Text
				style={{
					color: "#fff",
					lineHeight: 24,
					fontSize: 16
				}}
			>
				{text}
			</Text>
		</Snackbar>
	);
}

const styles = StyleSheet.create({});
