import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const NewsDTLSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <Skeleton
        animation="pulse"
        width="70%"
        height={15}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="99%"
        height={190}
        style={{ borderRadius: 12 }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={20}
        style={{ marginTop: 10, backgroundColor: "#d9d9d9", borderRadius: 8 }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={20}
        style={{ marginTop: 10, backgroundColor: "#d9d9d9", borderRadius: 8 }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={20}
        style={{ marginTop: 10, backgroundColor: "#d9d9d9", borderRadius: 8 }}
      />
    </View>
  );
};

export default NewsDTLSkeleton;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
  },
});
