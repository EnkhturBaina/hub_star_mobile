import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Contact = (props) => {
	const [rating, setRating] = useState(0);
	const calculateAverage = (arr) => {
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += arr[i];
		}
		setRating(toInteger(sum / arr.length));
	};
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
			<Text style={{ fontWeight: "bold" }}>Үнэлгээ</Text>
			<Text>2</Text>
			<Text style={{ fontWeight: "bold" }}>Утасны дугаар</Text>
			<Text>{props.data?.phone ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Зар байршуулсан</Text>
			<Text>{props.data?.organizationName ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Веб хуудас</Text>
			<Text>{props.data?.webUrl ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Имэйл</Text>
			<Text>{props.data?.email ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Байршил</Text>
			<Text>{props.data?.address ?? "-"}</Text>
		</View>
	);
};

export default Contact;

const styles = StyleSheet.create({});
