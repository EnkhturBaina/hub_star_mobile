import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MainContext from "../contexts/MainContext";
import "dayjs/locale/es";
import dayjs from "dayjs";
import GradientButton from "./GradientButton";
import { useNavigation } from "@react-navigation/native";

const SingleServiceDetails = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#f3f3f3",
				flexDirection: "column",
				padding: 20,
				gap: 10
			}}
		>
			<Text style={{ fontWeight: "bold" }}>Үнэлгээ</Text>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{/* <StarRatingDisplay
                  rating={
                    parseInt(props.adviceData.rating) > 0
                      ? parseInt(props.adviceData.rating) / 2
                      : 0
                  }
                  starSize={25}
                  emptyColor={MAIN_COLOR}
                  color={MAIN_COLOR}
                  style={{ padding: 0 }}
                />
                <Text>
                  {" "}
                  {parseInt(props.adviceData.rating) > 0
                    ? parseInt(props.adviceData.rating) / 2
                    : 0}{" "}
                  / 10
                </Text> */}
			</View>
			<Text style={{ fontWeight: "bold" }}>Үнэ </Text>
			<Text>{state.addCommas(state.removeNonNumeric(props.adviceData?.unitAmount)) ?? "-"}₮</Text>
			<Text style={{ fontWeight: "bold" }}>Нийтэлсэн огноо </Text>
			<Text>{dayjs(props.adviceData?.createdAt).format("YYYY-MM-DD HH:mm:ss") ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>Зарын дугаар </Text>
			<Text>{props.adviceData?.id ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>Утасны дугаар </Text>
			<Text>{props.adviceData?.phone ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>Зар байршуулсан </Text>
			<Text>
				{props.adviceData?.createdUser?.organizationName
					? props.adviceData?.createdUser?.organizationName
					: props.adviceData?.createdUser?.lastName + " " + props.adviceData?.createdUser?.firstName}{" "}
			</Text>
			<Text style={{ fontWeight: "bold" }}>Веб хуудас </Text>
			<Text> - </Text>
			<Text style={{ fontWeight: "bold" }}>И-мэйл </Text>
			<Text>{props.adviceData?.email ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>Байршил </Text>
			<Text>{props.adviceData?.address ?? "-"} </Text>
			<GradientButton
				text="Профайл үзэх"
				action={() => {
					navigation.navigate("SingleServiceViewProfileScreen", {
						createdBy: props.adviceData.createdBy
					});
				}}
				height={40}
				radius={6}
			/>
			<TouchableOpacity
				activeOpacity={1}
				style={{
					height: 40,
					backgroundColor: "#dadada",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 6
				}}
			>
				<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Материал татаж авах</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SingleServiceDetails;

const styles = StyleSheet.create({});
