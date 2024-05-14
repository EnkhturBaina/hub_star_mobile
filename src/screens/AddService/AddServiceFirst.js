import {
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import MainContext from "../../contexts/MainContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

const AddServiceFirst = (props) => {
  const state = useContext(MainContext);

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation?.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      props.navigation?.getParent()?.setOptions({
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 105,
          padding: 10,
        },
      });
    // TabBar Hide хийх
  }, [props.navigation]);
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
      <View style={{ flexDirection: "column", flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate("AddService")}
          style={styles.addItemContainer}
        >
          <Icon name="pluscircle" type="antdesign" size={70} color="#c5c5c5" />
          <Text style={{ fontSize: 18, color: "#919395" }}>
            Онцгой үйлчилгээ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate("AddService")}
          style={styles.addItemContainer}
        >
          <Icon name="pluscircle" type="antdesign" size={70} color="#c5c5c5" />

          <Text style={{ fontSize: 18, color: "#919395" }}>
            Энгийн үйлчилгээ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default AddServiceFirst;

const styles = StyleSheet.create({
  addItemContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    height: 150,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});
