import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import SpecialServiceData from "../../refs/SpecialServiceData";
import MainContext from "../../contexts/MainContext";
import { useNavigation } from "@react-navigation/native";
import { MAIN_BORDER_RADIUS } from "../../constant";
import { i18n } from "../../refs/i18";

const SpecialService = () => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	return (
		<View>
			<Text style={{ fontWeight: 500, fontSize: 16, marginLeft: 20, marginBottom: 10 }}>
				{i18n.t("specialService")}
			</Text>
			<View style={styles.gridContainer}>
				{SpecialServiceData?.map((el, index) => {
					return (
						<TouchableOpacity
							onPress={() => {
								state.setSelectedSpecialService(el.type);
								state.setSpecialServiceParams((prevState) => ({
									...prevState,
									page: 1,
									directionIds: null,
									subDirectionIds: null,
									specialService: el.type
								}));
								navigation.navigate("SpecialServiceScreen");
							}}
							style={styles.gridItem}
							key={index}
						>
							<Image style={styles.typeLogo} source={el.icon} />
							<Text style={styles.featureText}>{i18n.t(el.title)}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default SpecialService;

const styles = StyleSheet.create({
	typeLogo: {
		resizeMode: "contain",
		width: 30,
		height: 30
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginHorizontal: 20,
		gap: 2
	},
	gridItem: {
		marginTop: 10,
		borderRadius: MAIN_BORDER_RADIUS,
		height: 65,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		width: "48%" // is 50% of container width
	},
	featureIcon: {
		resizeMode: "contain",
		width: 40,
		height: 40
	},
	featureText: {
		flex: 1,
		marginLeft: 5,
		color: "#798585",
		fontWeight: "500",
		flexShrink: 1
	}
});
