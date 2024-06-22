import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useContext, useEffect } from "react";
import { MAIN_COLOR } from "../../../../constant";
import { CheckBox } from "@rneui/base";
import LoanInput from "../../../../components/LoanInput";
import MainContext from "../../../../contexts/MainContext";
import ImageModal from "../../../../components/ImageModal";
import { i18n } from "../../../../refs/i18";

const PublicSelection = (props) => {
	const state = useContext(MainContext);

	useEffect(() => {
		if (props.tempUnitAmount != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				unitAmount: parseInt(props.tempUnitAmount?.replaceAll(",", ""))
			}));
		}
		//үйлчилгээ засах үед үнэ SET хийх
		if (state.serviceData?.unitAmount && props.tempUnitAmount == null) {
			props.setTempUnitAmount(state.addCommas(state.removeNonNumeric(state.serviceData?.unitAmount)));
		}
	}, [props.tempUnitAmount]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
		>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#fff"
				}}
			>
				<View style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={styles.scrollContainer}
						bounces={false}
						automaticallyAdjustKeyboardInsets={true}
					>
						<Text
							style={{
								fontWeight: "bold",
								marginLeft: 5,
								fontSize: 16,
								alignSelf: "flex-end"
							}}
						>
							{i18n.t("publicSelection")}
						</Text>
						<LoanInput
							label={i18n.t("adOrtog")}
							keyboardType="number-pad"
							value={props.tempUnitAmount}
							onChangeText={(e) => {
								props.setTempUnitAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	unitAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<Text style={styles.label}>{i18n.t("uploadImage")}</Text>
						<ImageModal />
						<LoanInput
							label={i18n.t("desciption")}
							value={state.serviceData?.desciption}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									desciption: e
								}))
							}
							numberOfLines={3}
							multiline
						/>
						<LoanInput
							label={i18n.t("email")}
							value={state.serviceData?.email}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									email: e
								}))
							}
							keyboardType="email-address"
						/>
						<LoanInput
							label={i18n.t("phoneNumber")}
							value={state.serviceData?.phone}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									phone: e
								}))
							}
							keyboardType="number-pad"
							maxLength={8}
						/>
						<CheckBox
							containerStyle={{
								padding: 0,
								marginLeft: 0,
								marginTop: 10
							}}
							textStyle={{
								fontWeight: "bold",
								marginLeft: 5
							}}
							title={i18n.t("openMessenger")}
							checked={state.serviceData?.isMessenger}
							onPress={() => {
								state.setServiceData((prevState) => ({
									...prevState,
									isMessenger: !state.serviceData?.isMessenger
								}));
							}}
							iconType="material-community"
							checkedIcon="checkbox-outline"
							uncheckedIcon="checkbox-blank-outline"
							checkedColor={MAIN_COLOR}
							uncheckedColor={MAIN_COLOR}
						/>
						<CheckBox
							containerStyle={{
								padding: 0,
								marginLeft: 0,
								marginTop: 10
							}}
							textStyle={{
								fontWeight: "bold",
								marginLeft: 5
							}}
							title={i18n.t("confirmTerm")}
							checked={state.serviceData?.isTermOfService}
							onPress={() => {
								state.setServiceData((prevState) => ({
									...prevState,
									isTermOfService: !state.serviceData?.isTermOfService
								}));
							}}
							iconType="material-community"
							checkedIcon="checkbox-outline"
							uncheckedIcon="checkbox-blank-outline"
							checkedColor={MAIN_COLOR}
							uncheckedColor={MAIN_COLOR}
						/>
					</ScrollView>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default PublicSelection;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingTop: 10
	},
	label: {
		fontWeight: "bold",
		padding: 5
	}
});
