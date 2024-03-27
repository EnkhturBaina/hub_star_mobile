import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const NotificationDTLScreen = () => {
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

export default NotificationDTLScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
});
