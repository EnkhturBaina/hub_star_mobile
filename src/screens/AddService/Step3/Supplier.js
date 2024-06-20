import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useContext, useEffect } from "react";
import { MAIN_COLOR } from "../../../constant";
import { CheckBox } from "@rneui/base";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import ImageModal from "../../../components/ImageModal";

const Supplier = (props) => {
	const state = useContext(MainContext);

	useEffect(() => {
		if (props.tempUnitAmount != null || props.tempPackageAmount != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				unitAmount: parseInt(props.tempUnitAmount?.replaceAll(",", "")),
				packageAmount: parseInt(props.tempPackageAmount?.replaceAll(",", ""))
			}));
		}
		//үйлчилгээ засах үед үнэ SET хийх
		if (state.serviceData?.unitAmount && props.tempUnitAmount == null) {
			props.setTempUnitAmount(state.addCommas(state.removeNonNumeric(state.serviceData?.unitAmount)));
		}
		if (state.serviceData?.packageAmount && props.tempPackageAmount == null) {
			props.setTempPackageAmount(state.addCommas(state.removeNonNumeric(state.serviceData?.packageAmount)));
		}
	}, [props.tempUnitAmount, props.tempPackageAmount]);

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
						<Text>Supplier</Text>
						<LoanInput
							label="Бүтээгдэхүүний нэр"
							value={state.serviceData?.productName}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									productName: e
								}))
							}
						/>
						<LoanInput
							label="Нэгжийн үнэ"
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
						<LoanInput
							label="Багцын үнэ"
							keyboardType="number-pad"
							value={props.tempPackageAmount}
							onChangeText={(e) => {
								props.setTempPackageAmount(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	packageAmount: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<Text style={styles.label}>Зураг оруулах</Text>
						<ImageModal />
						<LoanInput
							label="Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл"
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
							label="И-мэйл"
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
							label="Утас"
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
							title="Мессэнжер нээх"
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
							title="Үйлчилгээний нөхцөл зөвшөөрөх"
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

export default Supplier;

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
