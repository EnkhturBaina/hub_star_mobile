import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

var deviceLanguage = "";
const getLocale = async () => {
	const data = await AsyncStorage.getItem("local_locale")
		.then((data) => {
			return data;
		})
		.catch((err) => {
			// console.log("ERROR checkUser Data******** : " + err.message);
		})
		.finally(() => {});
	return data;
};

getLocale().then((data) => {
	console.log("RUN getLocale", data);
	if (data) {
		deviceLanguage = data;
		i18n.defaultLocale = data;
		i18n.locale = data;
	} else {
		deviceLanguage = getLocales()?.[0]?.languageCode ?? "mn";
		i18n.defaultLocale = getLocales()?.[0]?.languageCode ?? "mn";
		i18n.locale = getLocales()?.[0]?.languageCode ?? "mn";
	}
});
export var deviceLanguage;

const translations = {
	mn: require("../locales/mn.json"),
	en: require("../locales/en.json"),
	zh: require("../locales/zh.json")
};
export const i18n = new I18n(translations);

i18n.enableFallback = true;

export function changeLanguage(lang) {
	console.log("LANG", lang);
	i18n.defaultLocale = lang;
	i18n.locale = lang;
}
