import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import MainContext from "../contexts/MainContext";

const ServiceDTLScreen = () => {
  const state = useContext(MainContext);
  useEffect(() => {
    console.log("state", state.selectedService);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        SocialPay ашиглан купон авах
      </Text>
      <Text>ServiceDTLScreen</Text>
    </ScrollView>
  );
};

export default ServiceDTLScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
});
