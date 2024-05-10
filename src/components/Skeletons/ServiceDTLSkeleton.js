import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const ServiceDTLSkeleton = () => {
  return (
    <View>
      <View style={styles.gridItem}>
        <Skeleton
          animation="pulse"
          width="80%"
          height={15}
          style={{
            marginBottom: 10,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Skeleton
            animation="pulse"
            width={40}
            height={40}
            style={{
              marginTop: 10,
              backgroundColor: "#d9d9d9",
              borderRadius: 8,
              marginHorizontal: 5,
            }}
          />
          <Skeleton
            animation="pulse"
            width="85%"
            height={40}
            style={{
              marginTop: 10,
              backgroundColor: "#d9d9d9",
              borderRadius: 8,
              marginHorizontal: 5,
            }}
          />
        </View>
        <Skeleton
          animation="pulse"
          width="100%"
          height={120}
          style={{ borderRadius: 12 }}
        />
        <Skeleton
          animation="pulse"
          width="90%"
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
          width="80%"
          height={15}
          style={{
            marginTop: 10,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        />
        <Skeleton
          animation="pulse"
          width="90%"
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
          width="80%"
          height={15}
          style={{
            marginTop: 10,
            backgroundColor: "#d9d9d9",
            borderRadius: 8,
            marginHorizontal: 5,
          }}
        />
      </View>
    </View>
  );
};

export default ServiceDTLSkeleton;

const styles = StyleSheet.create({
  gridItem: {
    marginBottom: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
});
