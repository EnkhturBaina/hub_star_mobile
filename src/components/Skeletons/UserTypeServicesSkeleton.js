import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const UserTypeServicesSkeleton = () => {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      {[...Array(3)].map((el, index) => {
        return (
          <View style={styles.gridItem} key={index}>
            <Skeleton
              animation="pulse"
              width="100%"
              height={120}
              style={{ borderRadius: 6 }}
            />
            <Skeleton
              animation="pulse"
              width="90%"
              height={20}
              style={{
                marginTop: 10,
                backgroundColor: "#d9d9d9",
                borderRadius: 6,
                marginHorizontal: 5,
              }}
            />
            <Skeleton
              animation="pulse"
              width="80%"
              height={15}
              style={{
                marginTop: 10,
                backgroundColor: "#d9d9d9",
                borderRadius: 6,
                marginHorizontal: 5,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default UserTypeServicesSkeleton;

const styles = StyleSheet.create({
  gridItem: {
    marginBottom: 15,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 6,
    width: "48%",
    paddingBottom: 5,
  },
});
