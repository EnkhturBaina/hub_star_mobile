import React, { useState, useEffect } from "react";
import { View, FlatList, Button } from "react-native";
import * as Contacts from "expo-contacts";

const ContactsList = () => {
	const [contacts, setContacts] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	useEffect(() => {
		loadContacts();
	}, [page]);

	const loadContacts = async () => {
		const { data } = await Contacts.getContactsAsync({
			pageSize,
			pageOffset: (page - 1) * pageSize
		});
		setContacts(data);
	};

	const loadMoreContacts = () => {
		setPage(page + 1);
	};

	return (
		<View>
			<FlatList
				data={contacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View>
						<Text>{item.name}</Text>
						<Text>{item.phoneNumbers[0]?.number}</Text>
					</View>
				)}
				onEndReached={loadMoreContacts}
				onEndReachedThreshold={0.1}
			/>
		</View>
	);
};

export default ContactsList;
