import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import forgot from "../../../assets/password/forgot.png";
import { MAIN_COLOR } from "../../constant";
import { Button, Icon } from "@rneui/base";
import axios from "axios";

const ResetPassword = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-around",
      }}
    >
      <Image
        source={forgot}
        resizeMode="contain"
        style={{ width: "100%", height: 200 }}
      />
      <Text style={styles.mainText}>
        Бүртгэлтэй утасны дугаар болон И-мэйлээр нууц үгээ сэргээх боломжтой
      </Text>

      <View>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            { borderColor: selectedType == "sms" ? MAIN_COLOR : "#fff" },
          ]}
          activeOpacity={0.6}
          onPress={() => setSelectedType("sms")}
          disabled
        >
          <View style={styles.statContainer}>
            <Icon
              name="message-square"
              type="feather"
              size={25}
              color={MAIN_COLOR}
              style={styles.statIcon}
            />
            <View style={styles.cardTextContainer}>
              <Text style={{}}>СМС илгээх:</Text>
              <Text style={{}}>(+976)</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            { borderColor: selectedType == "email" ? MAIN_COLOR : "#fff" },
          ]}
          activeOpacity={0.6}
          onPress={() => setSelectedType("email")}
        >
          <View style={styles.statContainer}>
            <Icon
              name="mail"
              type="feather"
              size={25}
              color={MAIN_COLOR}
              style={styles.statIcon}
            />
            <View style={styles.cardTextContainer}>
              <Text style={{}}>И-мэйл:</Text>
              <Text style={{}}>{props.route?.params?.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Button
          containerStyle={{ marginTop: 10 }}
          title={
            <>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Үргэлжүүлэх
              </Text>
              {loadingAction ? (
                <ActivityIndicator style={{ marginLeft: 5 }} color="#fff" />
              ) : null}
            </>
          }
          color={MAIN_COLOR}
          radius={12}
          onPress={() => {
            props.navigation.navigate("ConfirmPassword");
          }}
          titleStyle={{}}
          buttonStyle={{ height: 45 }}
          disabled={selectedType != "" ? false : true || loadingAction}
        />
      </View>
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  mainText: {
    textAlign: "center",
    marginTop: 20,
  },
  statIcon: {
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 5,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  cardContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cardTextContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
});
