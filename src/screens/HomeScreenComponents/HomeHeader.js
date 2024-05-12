import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.headerLogo}
        source={require("../../../assets/Logo.png")}
      />
      <View style={styles.headerIcons}>
        <Icon
          name="bell"
          type="feather"
          size={25}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("NotificationScreen")}
        />
        <Icon
          name="chatbox-ellipses-outline"
          type="ionicon"
          size={28}
          onPress={() => navigation.navigate("HistoryMainScreen")}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  headerLogo: {
    resizeMode: "contain",
    width: 120,
    height: 35,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
