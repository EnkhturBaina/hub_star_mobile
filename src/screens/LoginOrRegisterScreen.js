import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import React from "react";
import splash_logo from "../../assets/splash_logo.png";
import fb_logo from "../../assets/fb.png";
import google_logo from "../../assets/google.png";
import { MAIN_BG_GRAY } from "../constant";
import { Divider } from "@rneui/base";
import GradientButton from "../components/GradientButton";
import { i18n } from "../refs/i18";

const LoginOrRegisterScreen = (props) => {
	// var tempUUID = uuidv4();

	const login = async () => {};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : ""}
			style={{
				flex: 1,
				flexDirection: "column"
			}}
		>
			<ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
				<Image
					style={{
						resizeMode: "contain",
						width: "40%",
						height: "60%",
						zIndex: 999
					}}
					source={splash_logo}
				/>
				<Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 15 }}>{i18n.t("loginScreen")}</Text>
				{/* <View className="mb-2 flex-row rounded-lg items-center py-4 bg-white w-11/12 justify-center border border-gray-300 mx-4">
          <Image
            style={{
              resizeMode: "contain",
              width: 24,
              height: 24,
              marginRight: 10,
            }}
            source={fb_logo}
          />
          <Text className="font-medium text-base">
            Facebook хаягаар нэвтрэх
          </Text>
        </View>
        <View className="flex-row rounded-lg items-center py-4 bg-white w-11/12 justify-center border border-gray-300 mx-4">
          <Image
            style={{
              resizeMode: "contain",
              width: 24,
              height: 24,
              marginRight: 10,
            }}
            source={google_logo}
          />
          <Text className="font-medium text-base">Google хаягаар нэвтрэх</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Divider style={{ width: "30%" }} />
          <Text
            className="text-gray-300 font-medium text-xl text-center"
            style={{ width: "30%" }}
          >
            Эсвэл
          </Text>
          <Divider style={{ width: "30%" }} />
        </View> */}
				<View style={{ width: "90%" }}>
					<GradientButton
						text={i18n.t("login")}
						action={() => {
							props.navigation.navigate("LoginScreen");
						}}
					/>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ fontWeight: "500", marginVertical: 10 }}>{i18n.t("createAccount")}?</Text>
					<TouchableOpacity onPress={() => props.navigation.navigate("RegisterScreen")}>
						<Text style={{ color: "color: rgb(59 130 246)", marginLeft: 8 }}>{i18n.t("register")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default LoginOrRegisterScreen;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: MAIN_BG_GRAY,
		alignItems: "center"
	}
});
