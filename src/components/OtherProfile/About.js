import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
			<Text style={{ fontWeight: "bold" }}>Овог</Text>
			<Text>{props.data?.lastName ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Нэр</Text>
			<Text>{props.data?.firstName ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Албан тушаал</Text>
			<Text>{props.data?.jobPosition ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Утасны дугаар</Text>
			<Text>{props.data?.phone ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>И-мэйл хаяг</Text>
			<Text>{props.data?.email ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Хаяг</Text>
			<Text>{props.data?.address ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Тухай</Text>
			<Text>{props.data?.experience ?? "-"}</Text>
		</View>
	);
};

export default About;

const styles = StyleSheet.create({});
