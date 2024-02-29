import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { MainStore } from "./src/contexts/MainContext";
import HomeScreenTabNavigation from "./src/navigations/HomeScreenTabNavigation";
import MainDrawerNavigation from "./src/navigations/MainDrawerNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomBar from "./src/navigations/BottomBar";

export default function App() {
  return (
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
  );
}
