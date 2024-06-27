import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MainContext from "../contexts/MainContext";
import "dayjs/locale/es";
import dayjs from "dayjs";
import GradientButton from "./GradientButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { MAIN_COLOR } from "../constant";
import { i18n } from "../refs/i18";

const SingleServiceDetails = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const route = useRoute();
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
			<Text style={{ fontWeight: "bold" }}>{i18n.t("rating")}</Text>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<StarRatingDisplay
					rating={parseInt(props.adviceData.rating) > 0 ? parseInt(props.adviceData.rating) / 2 : 0}
					starSize={25}
					emptyColor={MAIN_COLOR}
					color={MAIN_COLOR}
					starStyle={{ marginLeft: 0 }}
				/>
				<Text> {parseInt(props.adviceData.rating) > 0 ? parseInt(props.adviceData.rating) / 2 : 0} / 10</Text>
			</View>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("price")} </Text>
			<Text>{state.addCommas(state.removeNonNumeric(props.adviceData?.price)) ?? "-"}₮</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("publishedDate")} </Text>
			<Text>{dayjs(props.adviceData?.createdAt).format("YYYY-MM-DD HH:mm:ss") ?? "-"}</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("adNumber")} </Text>
			<Text>{props.adviceData?.id ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("phoneNumber")} </Text>
			<Text>{props.adviceData?.phone ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("organizationName")} </Text>
			<Text>
				{props.adviceData?.createdUser?.organizationName
					? props.adviceData?.createdUser?.organizationName
					: props.adviceData?.createdUser?.lastName + " " + props.adviceData?.createdUser?.firstName}{" "}
			</Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("webUrl")} </Text>
			<Text> - </Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("email")} </Text>
			<Text>{props.adviceData?.email ?? "-"} </Text>
			<Text style={{ fontWeight: "bold" }}>{i18n.t("adAddress")} </Text>
			<Text>{props.adviceData?.address ?? "-"} </Text>
			<GradientButton
				text={i18n.t("watchProfile")}
				action={() => {
					navigation.navigate(
						route.name == "PROFILE_SingleServiceScreen"
							? "PROFILE_SingleServiceViewProfileScreen"
							: "SingleServiceViewProfileScreen",
						{
							createdBy: props.adviceData.createdBy
						}
					);
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
				<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{i18n.t("downloadMaterial")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SingleServiceDetails;
