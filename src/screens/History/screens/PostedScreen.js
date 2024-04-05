import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

const PostedScreen = (props) => {
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {[...Array(2)].map((el, index) => {
          return (
            <TouchableOpacity
              style={styles.gridItem}
              key={index}
              onPress={() => {
                props.navigation.navigate("ServiceDTLScreen");
              }}
            >
              <Image
                source={require("../../../../assets/splash_bg_1.jpg")}
                style={{
                  width: 100,
                  height: 90,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  padding: 10,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{ flex: 1, fontSize: 16, fontWeight: "500" }}
                >
                  Үндэсний шилдэг бүтээн байгуулагч NCD Group болон хот БАРИЛГЫН
                  САЛБАРЫН ХӨГЖЛИЙН ЧИГ ХАНДЛАГА
                </Text>
                <Text style={{ color: "#aeaeae", fontWeight: "500" }}>
                  NCD Group - {index}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.addItemContainer}>
          <Icon name="pluscircle" type="antdesign" size={50} color="#c5c5c5" />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default PostedScreen;

const styles = StyleSheet.create({
  gridContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },
  gridItem: {
    marginBottom: 15,
    marginHorizontal: 20,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 6,
    flexDirection: "row",
    height: 90,
  },
  addItemContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
  },
});
