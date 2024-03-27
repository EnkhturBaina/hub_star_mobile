import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MAIN_BORDER_RADIUS } from "../../../constant";

const AdviceScreen = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: "#fff",
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.gridContainer}>
        {[...Array(7)].map((el, index) => {
          return (
            <TouchableOpacity
              onPress={() => []}
              style={styles.gridItem}
              key={index}
            >
              <Image
                style={styles.fileIcon}
                source={require("../../../../assets/pdf_icon.png")}
              />
              <Text style={styles.fileText}>
                Ажил гүйцэтгэхэд холболгдох байгуулагууд
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AdviceScreen;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 2,
  },
  gridItem: {
    marginTop: 10,
    borderRadius: MAIN_BORDER_RADIUS,
    height: 150,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48%", // is 50% of container width
    borderColor: "#dadada",
    borderWidth: 1,
  },
  fileIcon: {
    height: 70,
    width: 55,
  },
  fileText: {
    textAlign: "center",
    color: "#919395",
    fontWeight: "500",
    marginTop: 10,
  },
});
