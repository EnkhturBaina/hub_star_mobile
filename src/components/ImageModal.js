import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import GradientButton from "./GradientButton";
import { IMG_URL, MAIN_COLOR_GRAY } from "../constant";
import MainContext from "../contexts/MainContext";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/base";
import { i18n } from "../refs/i18";

const ImageModal = (props) => {
	const state = useContext(MainContext);

	const [images, setImages] = useState([]);
	const [imageLoading, setImageLoading] = useState(false);
	const [visible1, setVisible1] = useState(false);
	const [zoomImgURL, setZoomImgURL] = useState(null);

	const uploadImageAsBinary = async (imgId) => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			// console.log("Permission to access media library denied");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.canceled) {
			setImageLoading(true);
			setVisible1(true);
			const data = await state.fileUpload(result?.assets[0]?.uri);
			// console.log("data", data);
			if (data) {
				//Зураг солих бол өмнөх оруулсан зурагны ID устгах
				const newImages = images.filter((img) => img !== imgId);
				setImages(newImages);

				setImages((prevState) => [...prevState, data?.response?.id]);
				setImageLoading(false);
				setVisible1(false);
			} else {
				setImageLoading(false);
				setVisible1(false);
			}
		}
	};

	useEffect(() => {
		if (images.length === 0 && state.isEditAd) {
			setImages(state.serviceData?.imageIds);
		}
	}, []);

	useEffect(() => {
		state.setServiceData((prevState) => ({
			...prevState,
			imageIds: images
		}));
	}, [images]);

	const onDelete = (fileId) => {
		const index = images?.indexOf(fileId);
		if (index > -1) {
			images.splice(index, 1);
		}
		state.setServiceData((prevState) => ({
			...prevState,
			imageIds: images
		}));
		setVisible1(false);
	};

	return (
		<View>
			<View style={styles.gridContainer}>
				{state.serviceData?.imageIds?.map((el, index) => {
					return (
						<View key={index} style={styles.gridItem}>
							<TouchableOpacity
								onPress={() => {
									setZoomImgURL(el);
									setVisible1(true);
								}}
								style={{ width: "80%", justifyContent: "center", padding: 5 }}
							>
								<Image source={{ uri: IMG_URL + el }} style={{ height: "100%", width: "100%" }} />
							</TouchableOpacity>
						</View>
					);
				})}
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						uploadImageAsBinary();
					}}
					style={styles.gridItem}
				>
					<Icon name="pluscircle" type="antdesign" size={30} color="#c5c5c5" />
					<Text style={{ fontSize: 18, color: "#919395" }}>{i18n.t("addImage")}</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				onRequestClose={() => {
					setVisible1(!visible1);
				}}
				visible={visible1}
				style={{
					backgroundColor: "rgba(52, 52, 52, 0.9)"
				}}
			>
				<View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.9)", paddingBottom: 20 }}>
					{imageLoading ? (
						<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
							<ActivityIndicator size="large" />
							<Text style={{ color: "#fff", marginTop: 5, fontWeight: "500" }}>
								{i18n.t("uploadingImagePleaseWait")}
							</Text>
						</View>
					) : (
						<>
							<View
								style={{
									height: 100,
									justifyContent: "flex-end",
									alignItems: "flex-end",
									marginRight: 20,
									marginTop: 10
								}}
							>
								<Icon
									name="x-circle"
									type="feather"
									size={40}
									color="#c5c5c5"
									onPress={() => {
										setVisible1(false);
									}}
								/>
							</View>
							<GestureHandlerRootView>
								<ImageZoom source={{ uri: IMG_URL + zoomImgURL }} style={{ flex: 1, height: 200, width: "100%" }} />
							</GestureHandlerRootView>
							<View
								style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
							>
								<View style={{ width: "44%" }}>
									<GradientButton
										text={i18n.t("change")}
										action={() => {
											setVisible1(false);
											uploadImageAsBinary(zoomImgURL);
										}}
										height={40}
										radius={6}
									/>
								</View>
								<View style={{ width: "44%" }}>
									<GradientButton text={i18n.t("delete")} action={() => onDelete(zoomImgURL)} height={40} radius={6} />
								</View>
							</View>
						</>
					)}
				</View>
			</Modal>
		</View>
	);
};

export default ImageModal;

const styles = StyleSheet.create({
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
