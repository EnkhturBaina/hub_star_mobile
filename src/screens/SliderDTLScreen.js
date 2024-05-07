import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SERVER_URL, X_API_KEY } from "../constant";
import axios from "axios";

const SliderDTLScreen = (props) => {
  console.log("props.route?.params", props.route?.params);
  const getNewsDTL = async () => {
    await axios
      .get(`${SERVER_URL}reference/news/show/${props.route?.params?.news_id}`, {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        console.log("get NewsDTL response", response.data.response);
        // setNews(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  useEffect(() => {
    props.route?.params?.news_id && getNewsDTL();
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
      <Text>
        Голомт банкны харилцагчдын тогтмол хэрэглээг урамшуулах зорилготой BiG
        Loyаlty 2023 оноотой хөтөлбөр дахин хэрэгжиж эхэллээ. Энэ хөтөлбөрийн
        хүрээнд та 2023.12.31-нийг дуустал Голомт банкны бүтээгдэхүүн,
        үйлчилгээг ашиглах бүрдээ оноо цуглуулж, төрөл бүрийн урамшуулалд
        хамрагдаарай. Та өөрийн цуглуулсан оноог хамтран ажиллаж буй
        байгууллагуудын купон авах эсвэл автомашин болон 1 өрөө орон сууцны
        шагналтай урамшуулалд оролцох гэсэн 2 хэлбэрээр зарцуулах боломжтой.
      </Text>
    </ScrollView>
  );
};

export default SliderDTLScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
});
