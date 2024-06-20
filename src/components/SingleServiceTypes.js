import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Chip } from "react-native-paper";
import axios from "axios";
import { SERVER_URL, X_API_KEY } from "../constant";
import MainContext from "../contexts/MainContext";
import { i18n } from "../refs/i18";

const SingleServiceTypes = (props) => {
	const state = useContext(MainContext);
	const [subDirections, setSubDirections] = useState([]);

	const getSubDirections = async () => {
		setSubDirections([]);
		await axios
			.get(`${SERVER_URL}reference/sub-direction`, {
				params: {
					directionId: props.directionId
				},
				headers: {
					"X-API-KEY": X_API_KEY
				}
			})
			.then((response) => {
				// console.log(
				//   "get SubDirections response",
				//   JSON.stringify(response.data.response)
				// );
				setSubDirections(response.data.response);
			})
			.catch((error) => {
				console.error("Error fetching STEP1 get Directions:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	useEffect(() => {
		getSubDirections();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#f3f3f3",
				flexDirection: "column",
				paddingHorizontal: 20,
				paddingTop: 10,
				gap: 10
			}}
		>
			<Text style={{ fontWeight: "bold", fontSize: 16 }}>{i18n.t("type")}</Text>
			<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" }}>
				{subDirections?.map((el, index) => {
					return (
						<Chip
							mode="outlined"
							key={index}
							style={{
								borderRadius: 30,
								backgroundColor: "#FAFAFA",
								borderColor: "#909294",
								marginRight: 10,
								marginBottom: 10
							}}
							textStyle={{ color: "#909294", fontWeight: "bold" }}
						>
							{el.name}
						</Chip>
					);
				})}
			</View>
		</View>
	);
};

export default SingleServiceTypes;

const styles = StyleSheet.create({});
