import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const NotificationSkeleton = () => {
	return (
		<View style={styles.cardContainer}>
			<Skeleton
				animation="pulse"
				width="100%"
				height={120}
				style={{
					marginBottom: 10,
					backgroundColor: "#d9d9d9",
					borderRadius: 8
				}}
			/>
			<Skeleton
				animation="pulse"
				width="100%"
				height={120}
				style={{
					marginBottom: 10,
					backgroundColor: "#d9d9d9",
					borderRadius: 8
				}}
			/>
		</View>
	);
};

export default NotificationSkeleton;

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		width: 180,
		height: 120,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		marginLeft: 20
	}
});
