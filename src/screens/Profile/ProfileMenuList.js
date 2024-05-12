import { Icon } from "@rneui/base";
import { GRAY_ICON_COLOR } from "../../constant";

export const menuList = [
  {
    id: 1,
    name: "Профайл засах",
    icon: (
      <Icon
        name="account-circle-outline"
        type="material-community"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),
    nav: "EditProfile",
  },
  {
    id: 2,
    name: "Мэдэгдэл",
    icon: (
      <Icon
        name="options-outline"
        type="ionicon"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),

    nav: "Notification",
  },
  {
    id: 3,
    name: "Дансны мэдээлэл",
    icon: (
      <Icon
        name="credit-card-edit-outline"
        type="material-community"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),
    nav: "Account",
  },
  {
    id: 4,
    name: "Баталгаажуулалт",
    icon: (
      <Icon
        name="shield-lock"
        type="octicon"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),

    nav: "Confirmation",
  },
  {
    id: 5,
    name: "Нууцлал",
    icon: (
      <Icon
        name="shield-lock"
        type="octicon"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),

    nav: "Security",
  },
  {
    id: 6,
    name: "Хэл солих",
    icon: <Icon name="flag" type="feather" size={25} color={GRAY_ICON_COLOR} />,

    nav: "Language",
  },
  {
    id: 7,
    name: "Түгээмэл асуулт хариулт",
    icon: (
      <Icon
        name="file-document-outline"
        type="material-community"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),

    nav: "QAs",
  },
  {
    id: 8,
    name: "Найзуудаа урих",
    icon: (
      <Icon
        name="account-multiple-outline"
        type="material-community"
        size={25}
        color={GRAY_ICON_COLOR}
      />
    ),

    nav: "Invite",
  },
];
