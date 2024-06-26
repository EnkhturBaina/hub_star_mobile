import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from "react-native";
import React, { useContext } from "react";
import UserTabData from "../../refs/UserTabData";
import MainContext from "../../contexts/MainContext";
import { MAIN_BORDER_RADIUS } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { i18n } from "../../refs/i18";

const UserTypes = (props) => {
	const state = useContext(MainContext);
	const navigation = useNavigation();
	return (
		<View style={{ marginBottom: 10 }}>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
				{UserTabData.map((el, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={[styles.typeContainer, {}]}
							onPress={() => {
								state.setSelectedUserType(el.type);
								state.setUserTypeParam((prevState) => ({
									...prevState,
									page: 1,
									userType: el.type
								}));
								navigation.navigate("UserTypeServiceScreen");
							}}
						>
							<Image style={styles.typeLogo} source={el.image} />
							<Text style={styles.typeText}>{i18n.t(el.title)}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default UserTypes;

const styles = StyleSheet.create({
	typeContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		paddingHorizontal: 15
	},
	typeLogo: {
		resizeMode: "contain",
		width: 30,
		height: 30
	},
	typeText: {
		marginLeft: 5,
		textTransform: "capitalize",
		fontWeight: "500"
	}
});
