import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import forgot from "../../../assets/password/forgot.png";
import { MAIN_COLOR, SERVER_URL, X_API_KEY } from "../../constant";
import { Button, Icon } from "@rneui/base";
import axios from "axios";
import { i18n } from "../../refs/i18";

const ResetPassword = (props) => {
	const [selectedType, setSelectedType] = useState("");
	const [loadingAction, setLoadingAction] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const emailOTP = () => {
		try {
			setLoadingAction(true);
			axios
				.post(
					`${SERVER_URL}authentication/email/otp`,
					{
						email: props.route?.params?.email?.toLowerCase(),
						type: "Forget"
					},
					{
						headers: {
							"Content-Type": "application/json",
							"x-api-key": X_API_KEY
						}
					}
				)
				.then(async (response) => {
					// console.log("confirm OTP", response.data);
					if (response.data?.statusCode == 200) {
						setErrorMsg("");
						props.navigation.navigate("ConfirmPassword", {
							details_prop: response.data.response.details,
							email_prop: props.route?.params?.email
						});
					}
				})
				.catch(function (error) {
					setErrorMsg(error.response?.data?.message);
					if (error.response) {
						console.log("error.response", error.response.data);
					}
				})
				.finally(() => {
					setLoadingAction(false);
				});
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<ScrollView
			bounces={false}
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: "#fff",
				paddingHorizontal: 20,
				paddingVertical: 10,
				justifyContent: "space-around"
			}}
			automaticallyAdjustKeyboardInsets={true}
		>
			<Image source={forgot} resizeMode="contain" style={{ width: "100%", height: 200 }} />
			<Text style={styles.mainText}>{i18n.t("resetPasswordTitle")}</Text>

			{errorMsg ? <Text className="font-bold text-center text-red-500">{errorMsg}</Text> : null}
			<View>
				<TouchableOpacity
					style={[styles.cardContainer, { borderColor: selectedType == "sms" ? MAIN_COLOR : "#fff" }]}
					activeOpacity={0.6}
					onPress={() => setSelectedType("sms")}
					disabled
				>
					<View style={styles.statContainer}>
						<Icon name="message-square" type="feather" size={25} color={MAIN_COLOR} style={styles.statIcon} />
						<View style={styles.cardTextContainer}>
							<Text style={{}}>{i18n.t("sendSMS")}:</Text>
							<Text style={{}}>(+976) **** ****</Text>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.cardContainer, { borderColor: selectedType == "email" ? MAIN_COLOR : "#fff" }]}
					activeOpacity={0.6}
					onPress={() => setSelectedType("email")}
				>
					<View style={styles.statContainer}>
						<Icon name="mail" type="feather" size={25} color={MAIN_COLOR} style={styles.statIcon} />
						<View style={styles.cardTextContainer}>
							<Text style={{}}>{i18n.t("email")}:</Text>
							<Text style={{}}>{props.route?.params?.email}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View>
				<Button
					containerStyle={{ marginTop: 10 }}
					title={
						<>
							<Text
								style={{
									fontSize: 16,
									color: "#fff",
									fontWeight: "bold"
								}}
							>
								{i18n.t("continue")}
							</Text>
							{loadingAction ? <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" /> : null}
						</>
					}
					color={MAIN_COLOR}
					radius={12}
					onPress={() => {
						emailOTP();
					}}
					titleStyle={{}}
					buttonStyle={{ height: 45 }}
					disabled={selectedType != "" ? false : true || loadingAction}
				/>
			</View>
		</ScrollView>
	);
};

export default ResetPassword;

const styles = StyleSheet.create({
	mainText: {
		textAlign: "center",
		marginTop: 20
	},
	statIcon: {
		justifyContent: "center",
		width: 60,
		height: 60,
		borderRadius: 50,
		marginBottom: 5
	},
	statContainer: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row"
	},
	cardContainer: {
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 10,
		marginTop: 10,
		borderWidth: 1,
		borderColor: "#fff"
	},
	cardTextContainer: {
		flexDirection: "column",
		marginLeft: 10
	}
});
