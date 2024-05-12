import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const EditProfileSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <Skeleton
        animation="pulse"
        width={150}
        height={20}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={40}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width={150}
        height={20}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={40}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width={150}
        height={20}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={40}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width={150}
        height={20}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={40}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width={150}
        height={20}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
      <Skeleton
        animation="pulse"
        width="100%"
        height={100}
        style={{
          marginBottom: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default EditProfileSkeleton;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    marginHorizontal: 20,
  },
});
