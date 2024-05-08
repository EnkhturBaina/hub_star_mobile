import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const SideFIlterSkeleton = () => {
  return (
    <View>
      <View style={styles.gridItem}>
        <Skeleton
          animation="pulse"
          width="80%"
          height={15}
          style={{
            marginTop: 10,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        />
        {[...Array(3)].map((el, index2) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              key={index2}
            >
              <Skeleton
                animation="pulse"
                width={20}
                height={20}
                style={{
                  marginTop: 10,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 8,
                  marginHorizontal: 5,
                }}
              />
              <Skeleton
                animation="pulse"
                width="60%"
                height={20}
                style={{
                  marginTop: 10,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 8,
                  marginHorizontal: 5,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SideFIlterSkeleton;

const styles = StyleSheet.create({
  gridItem: {
    marginBottom: 10,
  },
});
