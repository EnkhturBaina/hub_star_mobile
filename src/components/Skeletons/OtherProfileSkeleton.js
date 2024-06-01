import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

const OtherProfileSkeleton = () => {
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
			<View style={{ flexDirection: "row", marginTop: -50, marginLeft: 30, height: 110 }}>
				<Skeleton
					animation="pulse"
					width={100}
					height={100}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9"
					}}
					circle
				/>
				<View style={{ flexDirection: "column", width: 200, justifyContent: "flex-end", marginLeft: 10 }}>
					<Skeleton
						animation="pulse"
						width="70%"
						height={20}
						style={{
							marginBottom: 10,
							backgroundColor: "#d9d9d9",
							borderRadius: 8
						}}
					/>
					<Skeleton
						animation="pulse"
						width="50%"
						height={15}
						style={{
							marginBottom: 10,
							backgroundColor: "#d9d9d9",
							borderRadius: 8
						}}
					/>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<Skeleton
					animation="pulse"
					width="30%"
					height={30}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="30%"
					height={30}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="30%"
					height={30}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
			</View>
			<View style={styles.detailContainer}>
				<Skeleton
					animation="pulse"
					width={150}
					height={20}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="100%"
					height={40}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width={150}
					height={20}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="100%"
					height={40}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width={150}
					height={20}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="100%"
					height={40}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width={150}
					height={20}
					style={{
						marginBottom: 10,
						backgroundColor: "#d9d9d9",
						borderRadius: 8
					}}
				/>
				<Skeleton
					animation="pulse"
					width="100%"
					height={100}
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

export default OtherProfileSkeleton;

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
	},
	detailContainer: {
		flex: 1,
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			height: 3,
			width: 2
		},
		elevation: 2
	}
});
