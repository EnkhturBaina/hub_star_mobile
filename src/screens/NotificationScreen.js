import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import { MAIN_COLOR } from "../constant";

const NotificationScreen = (props) => {
  const [isNew, setIsNew] = useState({});
  const data = [
    {
      label: "2023-08-25",
      data: [
        {
          isNew: false,
          title: "SocialPay ашиглан купон авах",
          body: "Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ",
          date: "14:36",
        },
        {
          isNew: true,
          title: "SocialPay ашиглан купон авах",
          body: "Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ",
          date: "14:36",
        },
      ],
      id: "1",
    },
    {
      label: "2023-08-26",
      data: [
        {
          isNew: false,
          title: "SocialPay ашиглан купон авах",
          body: "Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ",
          date: "14:36",
        },
        {
          isNew: true,
          title: "SocialPay ашиглан купон авах",
          body: "Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ",
          date: "14:36",
        },
        {
          isNew: true,
          title: "SocialPay ашиглан купон авах",
          body: "Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ",
          date: "14:36",
        },
      ],
      id: "2",
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {data?.map((el, index) => {
        return (
          <View key={index} style={{}}>
            <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 10 }}>
              Өнөөдөр (2023-08-25)
            </Text>
            {el.data?.map((dtl, index2) => {
              return (
                <TouchableOpacity
                  style={styles.cardContainer}
                  key={index2}
                  onPress={() =>
                    props.navigation.navigate("NotificationDTLScreen")
                  }
                >
                  <View
                    style={{
                      backgroundColor: dtl.isNew ? "#fef4e8" : "#f6f6f6",
                      padding: 10,
                      borderRadius: 100,
                      borderColor: "#aeaeae",
                    }}
                  >
                    <Icon
                      name="file-text"
                      type="feather"
                      size={28}
                      color={dtl.isNew ? MAIN_COLOR : "#aeaeae"}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                      {dtl.title}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{ flex: 1, color: "#aeaeae", fontWeight: "500" }}
                    >
                      {dtl.body}
                    </Text>
                  </View>
                  <Text
                    style={{
                      overflow: "hidden",
                      fontWeight: "500",
                      fontSize: 16,
                      color: dtl.isNew ? "#fff" : "#aeaeae",
                      backgroundColor: dtl.isNew ? MAIN_COLOR : "transparent",
                      borderRadius: 12,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    {dtl.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderColor: "#DADADA",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
});
