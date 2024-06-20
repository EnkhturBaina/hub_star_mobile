import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useContext, useEffect } from "react";
import { MAIN_COLOR } from "../../../constant";
import { CheckBox } from "@rneui/base";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import ImageModal from "../../../components/ImageModal";

const Executor = (props) => {
	const state = useContext(MainContext);

	useEffect(() => {
		if (props.tempPrice != null) {
			state.setServiceData((prevState) => ({
				...prevState,
				price: parseInt(props.tempPrice?.replaceAll(",", ""))
			}));
		}

		//үйлчилгээ засах үед үнэ SET хийх
		if (state.serviceData?.price && props.tempPrice == null) {
			props.setTempPrice(state.addCommas(state.removeNonNumeric(state.serviceData?.price)));
		}
	}, [props.tempPrice]);

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
						<Text>Executor - {state.serviceData?.imageIds}</Text>
						<LoanInput
							label="Ажилчдын тоо"
							value={state.serviceData?.workerCount?.toString()}
							keyboardType="number-pad"
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									workerCount: e
								}))
							}
						/>
						<LoanInput
							label="Ажлын тоо хэмжээ"
							value={state.serviceData?.counter?.toString()}
							keyboardType="number-pad"
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									counter: e
								}))
							}
						/>
						<LoanInput
							label="Үнэ"
							keyboardType="number-pad"
							value={props.tempPrice}
							onChangeText={(e) => {
								props.setTempPrice(state.addCommas(state.removeNonNumeric(e)));
								// state.setServiceData((prevState) => ({
								// 	...prevState,
								// 	price: state.addCommas(state.removeNonNumeric(e))
								// }))
							}}
						/>
						<Text style={styles.label}>Зураг оруулах</Text>
						<ImageModal />
						<LoanInput
							label="Тайлбар ба ажлын туршлага"
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
							title="Өдрөөр хийх ажил"
							checked={state.serviceData?.isAfternoon}
							onPress={() => {
								state.setServiceData((prevState) => ({
									...prevState,
									isAfternoon: !state.serviceData?.isAfternoon
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

export default Executor;

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
