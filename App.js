import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MainStore } from "./src/contexts/MainContext";
import HomeScreenTabNavigation from "./src/navigations/HomeScreenTabNavigation";
import MainDrawerNavigation from "./src/navigations/MainDrawerNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomBar from "./src/navigations/BottomBar";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import * as Updates from "expo-updates";
import { useEffect } from "react";

export default function App() {
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			alert(`Error fetching latest Expo update: ${error}`);
		}
	}

	useEffect(() => {
		onFetchUpdateAsync();
	}, []);

	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<MainStore>
						{/* <MainDrawerNavigation /> */}
						{/* Drawer нэмэгдэхээр бол дээрхи кодны коммент -г авах */}
						{/* <HomeScreenTabNavigation /> */}
						<BottomBar />
					</MainStore>
				</NavigationContainer>
			</SafeAreaProvider>
		</AutocompleteDropdownContextProvider>
	);
}
