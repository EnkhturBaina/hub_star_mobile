import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MAIN_BORDER_RADIUS, MAIN_COLOR } from "../../constant";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { List } from "react-native-paper";
import { Icon } from "@rneui/base";

const Tab = createMaterialTopTabNavigator();
const QAs = (props) => {
  const state = useContext(MainContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [expanded, setExpanded] = useState({});

  const handlePress = () => setExpanded(!expanded);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <List.Section title="Accordions">
        <List.Accordion
          title="Асуулт 1"
          style={{ backgroundColor: "#fff" }}
          rippleColor={"transparent"}
          titleStyle={{ fontWeight: "500" }}
        >
          <List.Item description="Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ" />
        </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          expanded={expanded}
          onPress={handlePress}
          style={{ backgroundColor: "#fff" }}
          rippleColor={"transparent"}
          titleStyle={{ fontWeight: "500" }}
        >
          <List.Item description="Та өөрийн цуглуулсан оноог хамтран ажиллаж буй байгууллагуудын купон авах эсвэл автомашин болон 1 өрөө орон сууцны шагналтай урамшуулалд оролцох гэсэн 2 хэлбэрээр зарцуулах боломжтой." />
        </List.Accordion>
      </List.Section>
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <TouchableOpacity style={styles.aboutContainer}>
        <Icon
          name="whatsapp"
          type="fontisto"
          size={23}
          style={{ marginRight: 10 }}
          onPress={() => console.log("X")}
        />
        <Text>WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutContainer}>
        <Icon
          name="world-o"
          type="fontisto"
          size={23}
          style={{ marginRight: 10 }}
          onPress={() => console.log("X")}
        />
        <Text>Website</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutContainer}>
        <Icon
          name="facebook"
          type="fontisto"
          size={23}
          style={{ marginRight: 20 }}
          onPress={() => console.log("X")}
        />
        <Text>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.aboutContainer}>
        <Icon
          name="twitter"
          type="fontisto"
          size={23}
          style={{ marginRight: 10 }}
          onPress={() => console.log("X")}
        />
        <Text>Twitter</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarAndroidRipple: {
            color: "transparent",
          },
          tabBarLabelStyle: {
            textTransform: "none",
          },
          tabBarStyle: {
            backgroundColor: "#fff",
          },
          tabBarIndicatorStyle: {
            backgroundColor: MAIN_COLOR,
            height: 5,
            borderRadius: 12,
          },
        }}
      >
        <Tab.Screen name="Түгээмэл асуулт" component={FirstRoute} />
        <Tab.Screen name="Бидний тухай" component={SecondRoute} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default QAs;

const styles = StyleSheet.create({
  aboutContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 15,
    borderRadius: MAIN_BORDER_RADIUS,
  },
});
