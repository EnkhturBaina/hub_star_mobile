import { StyleSheet, Text, View, Linking, ScrollView, StatusBar, Platform, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";
import GradientButton from "../../components/GradientButton";
import { Avatar } from "@rneui/base";
import { Searchbar } from "react-native-paper";
import { MAIN_BORDER_RADIUS, MAIN_COLOR } from "../../constant";
import { ActivityIndicator } from "react-native";

const Invite = () => {
	const [contactData, setContactData] = useState([]);
	const [searchVal, setSearchVal] = useState("");
	const [loading, setLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [nextPage, setNextPage] = useState(false);

	const tabBarHeight = useBottomTabBarHeight();

	useEffect(() => {
		fetchMore();
	}, []);

	const fetchMore = async () => {
		console.log("offset", offset);
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === "granted") {
				if (loading) return;

				setLoading(true);
				const { data, hasNextPage } = await Contacts.getContactsAsync({
					sort: "firstName",
					pageOffset: offset,
					pageSize: 20
				});
				setNextPage(hasNextPage);

				// offset == 0 && setContactData(data);

				const res = data?.filter((x) => !contactData?.some((y) => y.id === x.id));
				setContactData((prevState) => [...prevState, ...res]);

				setOffset(offset + 1);
			}
		})().finally(() => {
			setLoading(false);
		});
	};

	const onChangeSearch = (query) => {
		// console.log("query", query);
		setSearchVal(query);
	};

	const renderFooter = () => {
		return <View>{loading ? <ActivityIndicator color={MAIN_COLOR} style={{ padding: 5 }} /> : null}</View>;
	};
	const renderItem = ({ item, index }) => {
		return (
			<View
				key={index}
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 5
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Avatar
						size={40}
						rounded
						title={"firstName" in item && item.firstName[0].concat("", "lastName" in item ? item.lastName?.[0] : "")}
						containerStyle={{ backgroundColor: MAIN_COLOR }}
					/>
					<View style={{ flexDirection: "column", marginLeft: 10 }}>
						<Text style={{ fontWeight: "bold" }}>
							{"firstName" in item && item.firstName?.concat(" ", "lastName" in item ? item.lastName : "")}
						</Text>
						{"phoneNumbers" in item && item.phoneNumbers[0] ? (
							<Text style={{ color: "#bababa" }}>{item.phoneNumbers[0]?.digits}</Text>
						) : null}
					</View>
				</View>
				<View style={{ width: 100 }}>
					<GradientButton
						text="Урих"
						action={() => {
							"phoneNumbers" in item && item.phoneNumbers[0]
								? Linking.openURL(`sms:${item.phoneNumbers[0]?.digits}&body=HubStar application татаарай`)
								: null;
						}}
						height={35}
						radius={6}
					/>
				</View>
			</View>
		);
	};
	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: "#fff",
				paddingBottom: tabBarHeight
			}}
		>
			<Searchbar
				placeholder="Хайх"
				onChangeText={(e) => {
					onChangeSearch(e);
				}}
				value={searchVal}
				style={styles.searchBar}
				elevation={0}
				onSubmitEditing={(event) => {
					// setSearchVal(event.nativeEvent.text);
				}}
				onClearIconPress={() => {}}
				inputStyle={{ minHeight: 0 }}
			/>
			{/* <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      > */}
			<StatusBar translucent barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
			<FlatList
				keyExtractor={(item, index) => index.toString()}
				data={contactData?.filter((el) => "firstName" in el && el.firstName?.startsWith(searchVal))}
				style={styles.list}
				renderItem={renderItem}
				onEndReached={() => {
					!searchVal && nextPage && fetchMore();
				}}
				onEndReachedThreshold={0.1}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				windowSize={5}
				initialNumToRender={10}
				ListFooterComponent={renderFooter}
				contentContainerStyle={{ marginHorizontal: 20 }}
			/>
			{/* </ScrollView> */}
		</SafeAreaProvider>
	);
};

export default Invite;

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: "#f0f0f0",
		borderRadius: MAIN_BORDER_RADIUS,
		marginBottom: 5,
		elevation: 0,
		marginHorizontal: 20,
		height: 40
	}
});
