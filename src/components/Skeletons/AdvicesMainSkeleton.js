import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const AdvicesMainSkeleton = () => {
	return (
		<View style={styles.cardContainer}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Skeleton
					animation="pulse"
					width={150}
					height={35}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8,
						marginRight: 10
					}}
				/>
				<Skeleton
					animation="pulse"
					width={170}
					height={35}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8,
						marginRight: 10
					}}
				/>
				<Skeleton
					animation="pulse"
					width={170}
					height={35}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
				<Skeleton
					animation="pulse"
					width={40}
					height={40}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="48%"
					height={40}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
				<Skeleton
					animation="pulse"
					width="48%"
					height={120}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="48%"
					height={120}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
			</View>
		</View>
	);
};

export default AdvicesMainSkeleton;

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2,
		marginHorizontal: 20
	}
});
