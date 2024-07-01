import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../contexts/MainContext";
import "dayjs/locale/es";
import dayjs from "dayjs";
import GradientButton from "./GradientButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../constant";
import { i18n } from "../refs/i18";
import axios from "axios";
import { Dialog } from "@rneui/base";
import LoanInput from "./LoanInput";

const SingleServiceDetails = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	const route = useRoute();
	const [profileData, setProfileData] = useState(null);
	const [noteData, setNoteData] = useState(null);
	const [visible5, setVisible5] = useState(false);
	const [rating, setRating] = useState(0);

	const getProfileData = async () => {
		await axios
			.get(`${SERVER_URL}authentication`, {
				headers: {
					"X-API-KEY": X_API_KEY,
					Authorization: `Bearer ${state.token}`
				}
			})
			.then((response) => {
				// console.log("AAA", JSON.stringify(response.data.response?.user));
				setProfileData(response.data.response?.user);
			})
			.catch((error) => {
				// console.error("Error fetching get ProfileData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			});
	};

	useEffect(() => {
		getProfileData();
	}, []);

	const toggleDialog5 = () => {
		setVisible5(!visible5);
	};
	const handleUpdate = async () => {
		props.adviceData["process"] = "DONE";

		await axios
			.patch(
				`${SERVER_URL}advertisement/${props.adviceData?.id}`,
				{
					...props.adviceData
				},
				{
					headers: {
						"x-api-key": X_API_KEY,
						Authorization: `Bearer ${state.token}`
					}
				}
			)
			.then((response) => {
				// console.log("handleUpdate", JSON.stringify(response.data.response));
				// setProfileData(response.data.response?.user);
			})
			.catch((error) => {
				// console.error("Error fetching get ProfileData:", error);
				if (error.response.status == "401") {
					state.Handle_401();
				}
			})
			.finally(() => {
				toggleDialog5();
			});

		state.handleNotification({
			id: 0,
			authorId: props.adviceData.doingBy,
			advertisementId: props.adviceData.id,
			process: props.adviceData.process,
			description: noteData
		});
	};

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
			{props.adviceData?.process == "DOING" && profileData?.userType == "SUBSCRIBER" ? (
				<GradientButton
					text={i18n.t("changeAdvStatus")}
					action={() => {
						toggleDialog5();
					}}
					height={40}
					radius={6}
				/>
			) : null}
			<Dialog isVisible={visible5} onBackdropPress={toggleDialog5} overlayStyle={{ backgroundColor: "#fff" }}>
				<Dialog.Title title={i18n.t("changeAdvStatus")} />
				<LoanInput
					label={i18n.t("notes")}
					value={noteData}
					onChangeText={(e) => setNoteData(e)}
					numberOfLines={3}
					multiline
				/>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<StarRating
						rating={rating}
						onChange={setRating}
						enableHalfStar={false}
						emptyColor={MAIN_COLOR}
						color={MAIN_COLOR}
						starStyle={{ marginLeft: 0 }}
					/>
					<Text>{rating} / 5</Text>
				</View>
				<Dialog.Actions>
					<Dialog.Button
						title={i18n.t("save")}
						onPress={() => {
							handleUpdate();
						}}
						titleStyle={{ color: MAIN_COLOR, fontWeight: "bold" }}
					/>
					<Dialog.Button title={i18n.t("close")} onPress={toggleDialog5} titleStyle={{ color: "#000" }} />
				</Dialog.Actions>
			</Dialog>
		</View>
	);
};

export default SingleServiceDetails;
