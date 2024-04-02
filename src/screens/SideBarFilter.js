import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Checkbox, Divider } from "react-native-paper";
import MainContext from "../contexts/MainContext";
import { MAIN_BG_GRAY, MAIN_COLOR, SERVER_URL } from "../constant";
import { Icon, ListItem } from "@rneui/base";

const SideBarFilter = (props) => {
  const state = useContext(MainContext);
  const [expanded, setExpanded] = useState({});
  const [checked, setChecked] = useState({});
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: "#aeaeae",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="options" type="ionicon" size={23} />
          <Text style={{ fontWeight: "500", fontSize: 16, marginLeft: 10 }}>
            Шүүлтүүр
          </Text>
        </View>
        <Icon
          name="chevron-left"
          type="feather"
          size={23}
          onPress={() => props.setIsOpen(false)}
        />
      </View>
      <Divider />
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={styles.dirContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {state?.mainDirection?.map((el, index) => {
          return (
            <View key={index} style={styles.eachDir}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 3,
                }}
              >
                {/* <Image
                  style={{ width: 20, height: 20 }}
                  source={{ uri: SERVER_URL + "images/" + el?.logo?.path }}
                /> */}
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginLeft: 5,
                  }}
                >
                  {el.name}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                }}
              >
                {el.children?.map((child, index2) => {
                  const checkOpen = expanded[index + "-" + index2];
                  const checkedItem = checked[index + "-" + index2];
                  return (
                    <ListItem.Accordion
                      noIcon={child?.sub_children != "" ? false : true}
                      key={index + "-" + index2}
                      content={
                        <ListItem.Content
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Checkbox.Android
                            status={checkedItem ? "checked" : "unchecked"}
                            onPress={() => {
                              setChecked((prevState) => ({
                                ...prevState,
                                [index + "-" + index2]:
                                  !prevState[index + "-" + index2],
                              }));
                            }}
                            color={MAIN_COLOR}
                          />
                          <ListItem.Title
                            style={{
                              color: checkOpen ? MAIN_COLOR : "#6f7275",
                              fontWeight: "500",
                              marginBottom: 5,
                            }}
                          >
                            {child.name}
                          </ListItem.Title>
                        </ListItem.Content>
                      }
                      isExpanded={checkOpen}
                      onPress={() => {
                        child?.sub_children != "" &&
                          setExpanded((prevState) => ({
                            ...prevState,
                            [index + "-" + index2]:
                              !prevState[index + "-" + index2],
                          }));
                      }}
                      containerStyle={{
                        paddingVertical: 8,
                        paddingHorizontal: 0,
                        backgroundColor: "#fff",
                      }}
                    >
                      <ListItem
                        containerStyle={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          backgroundColor: "#fff",
                        }}
                      >
                        {child?.sub_children?.map((sub, indexSub) => {
                          return (
                            <View
                              key={indexSub}
                              style={{
                                marginBottom: 20,
                              }}
                            >
                              <Text>{sub.name}</Text>
                            </View>
                          );
                        })}
                      </ListItem>
                    </ListItem.Accordion>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SideBarFilter;

const styles = StyleSheet.create({
  dirContainer: {
    flexGrow: 1,
    flexDirection: "column",
    paddingBottom: 60,
    paddingTop: 10,
  },
  eachDir: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    marginBottom: 10,
    paddingBottom: 10,
  },
});
