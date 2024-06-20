import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { i18n } from "../../refs/i18";

const About = (props) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				flexDirection: "column",
				padding: 20,
				gap: 10
			}}
		>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("lastName")}</Text>
			<Text>{props.data?.lastName ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("firstName")}</Text>
			<Text>{props.data?.firstName ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("jobPosition")}</Text>
			<Text>{props.data?.jobPosition ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("phoneNumber")}</Text>
			<Text>{props.data?.phone ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("email")}</Text>
			<Text>{props.data?.email ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("address")}</Text>
			<Text>{props.data?.address ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("experience")}</Text>
			<Text>{props.data?.experience ?? "-"}</Text>
		</View>
	);
};

export default About;

const styles = StyleSheet.create({});
