import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from "react-native";
import React, { useContext } from "react";
import UserTabData from "../../refs/UserTabData";
import MainContext from "../../contexts/MainContext";
import { MAIN_BORDER_RADIUS } from "../../constant";
import { useNavigation } from "@react-navigation/native";

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
							style={[
								styles.typeContainer,
								{
									marginLeft: index == 0 ? 20 : 10
								}
							]}
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
							<Text style={styles.typeText}>{el.title}</Text>
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
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		backgroundColor: "#fff",
		marginVertical: 5,
		alignSelf: "flex-start",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: MAIN_BORDER_RADIUS
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
