import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const ListServiceSkeleton = () => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      {[...Array(2)].map((el, index) => {
        return (
          <Skeleton
            animation="pulse"
            width="100%"
            height={90}
            key={index}
            style={{ marginBottom: 10, borderRadius: 12 }}
          />
        );
      })}
    </View>
  );
};

export default ListServiceSkeleton;

const styles = StyleSheet.create({
  gridItem: {
    marginBottom: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
});
