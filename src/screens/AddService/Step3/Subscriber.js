import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { useContext } from "react";
import { MAIN_COLOR, MAIN_COLOR_GRAY } from "../../../constant";
import { CheckBox } from "@rneui/base";
import LoanInput from "../../../components/LoanInput";
import MainContext from "../../../contexts/MainContext";
import ImageModal from "../../../components/ImageModal";

const Subscriber = (props) => {
	const state = useContext(MainContext);

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
					<ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
						<Text>Subscriber</Text>
						<LoanInput
							label="Хэмжих нэгж"
							value={state.serviceData?.measurement}
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									measurement: e
								}))
							}
						/>
						<LoanInput
							label="Ажлын тоо хэмжээ"
							value={state.serviceData?.counter}
							keyboardType="number-pad"
							onChangeText={(e) =>
								state.setServiceData((prevState) => ({
									...prevState,
									counter: e
								}))
							}
						/>
						<Text style={styles.label}>Зураг оруулах</Text>
						<ImageModal />
						<LoanInput
							label="Тайлбар"
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

export default Subscriber;

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
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	gridItem: {
		marginBottom: 10,
		borderRadius: 4,
		height: 100,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: MAIN_COLOR_GRAY,
		width: "48%" // is 50% of container width
	}
});
