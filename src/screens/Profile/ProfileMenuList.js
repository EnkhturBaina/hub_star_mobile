import { Icon } from "@rneui/base";
import { GRAY_ICON_COLOR } from "../../constant";

export const menuList = [
	{
		id: 1,
		name: "Профайл засах",
		icon: require("../../../assets/figma-icons/profile-circle.png"),
		nav: "EditProfile"
	},
	{
		id: 2,
		name: "Мэдэгдэл",
		icon: require("../../../assets/figma-icons/setting.png"),
		nav: "Notification"
	},
	{
		id: 3,
		name: "Дансны мэдээлэл",
		icon: require("../../../assets/figma-icons/card-edit.png"),
		nav: "Account"
	},
	{
		id: 4,
		name: "Баталгаажуулалт",
		icon: require("../../../assets/figma-icons/security-safe.png"),
		nav: "Confirmation"
	},
	{
		id: 5,
		name: "Нууцлал",
		icon: require("../../../assets/figma-icons/security-safe.png"),
		nav: "Security"
	},
	{
		id: 6,
		name: "Хэл солих",
		icon: require("../../../assets/figma-icons/flag-2.png"),
		nav: "Language"
	},
	{
		id: 7,
		name: "Түгээмэл асуулт хариулт",
		icon: require("../../../assets/figma-icons/document-text.png"),
		nav: "QAs"
	},
	{
		id: 8,
		name: "Найзуудаа урих",
		icon: require("../../../assets/figma-icons/profile-2user.png"),
		nav: "Invite"
	}
];
