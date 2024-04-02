import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GRAY_ICON_COLOR, MAIN_COLOR, MAIN_COLOR_GRAY } from "../../constant";
import { Switch } from "react-native-paper";

const Notification = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = useState(false);
  const [isSwitchOn4, setIsSwitchOn4] = useState(false);
  const [isSwitchOn5, setIsSwitchOn5] = useState(false);
  const [isSwitchOn6, setIsSwitchOn6] = useState(false);
  const [isSwitchOn7, setIsSwitchOn7] = useState(false);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />

        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Дуу, чимээ</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={() => setIsSwitchOn(!isSwitchOn)}
            color={MAIN_COLOR}
          />
        </View>
        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Чичиргээ</Text>
          <Switch
            value={isSwitchOn2}
            onValueChange={() => setIsSwitchOn2(!isSwitchOn2)}
            color={MAIN_COLOR}
          />
        </View>
        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Тусгай мэдэгдэл</Text>
          <Switch
            value={isSwitchOn3}
            onValueChange={() => setIsSwitchOn3(!isSwitchOn3)}
            color={MAIN_COLOR}
          />
        </View>
        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Урамшуулал ба хөнгөлөлт</Text>
          <Switch
            value={isSwitchOn4}
            onValueChange={() => setIsSwitchOn4(!isSwitchOn4)}
            color={MAIN_COLOR}
          />
        </View>

        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Төлбөр</Text>
          <Switch
            value={isSwitchOn5}
            onValueChange={() => setIsSwitchOn5(!isSwitchOn5)}
            color={MAIN_COLOR}
          />
        </View>

        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Апп шинэчлэх</Text>
          <Switch
            value={isSwitchOn6}
            onValueChange={() => setIsSwitchOn6(!isSwitchOn6)}
            color={MAIN_COLOR}
          />
        </View>

        <View style={styles.stackContainer}>
          <Text style={styles.stackText}>Үйлчилгээний мэдэгдэл</Text>
          <Switch
            value={isSwitchOn7}
            onValueChange={() => setIsSwitchOn7(!isSwitchOn7)}
            color={MAIN_COLOR}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Notification;

const styles = StyleSheet.create({
  stackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  stackText: {
    fontWeight: "500",
  },
});
