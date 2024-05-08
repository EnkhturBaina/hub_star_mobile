import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import MainContext from "../contexts/MainContext";
import {
  MAIN_BG_GRAY,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  SERVER_URL,
  X_API_KEY,
} from "../constant";
import { Icon, ListItem, CheckBox } from "@rneui/base";
import axios from "axios";
import SideFIlterSkeleton from "../components/Skeletons/SideFIlterSkeleton";
import Empty from "../components/Empty";

const SideBarFilter = (props) => {
  const state = useContext(MainContext);
  const [expanded, setExpanded] = useState({});
  const [checked, setChecked] = useState({});

  const [loadingSideFilter, setLoadingSideFilter] = useState(false);
  const [sideFilterData, setSideFilterData] = useState([]);

  const serviceParams = {
    specialService: state.selectedSpecialService,
    order: "DESC",
    page: 1,
    limit: 10,
    directionIds: null,
    subDirectionIds: null,
  };

  const getSideFilterData = async () => {
    setLoadingSideFilter(true);
    await axios
      .get(`${SERVER_URL}reference/direction`, {
        params: serviceParams,
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log(
        //   "get SideFilterData response",
        //   JSON.stringify(response.data.response)
        // );
        setSideFilterData(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      })
      .finally(() => {
        setLoadingSideFilter(false);
      });
  };
  useEffect(() => {
    getSideFilterData();
  }, []);

  const onChangeValue = (value) => {
    const currentDirections = setSideFilterData.filter((item) => {
      return item.subDirections.some((subdir) => value.includes(subdir.id));
    });
    setAdParam((prevState) => ({
      ...prevState,
      page: 1,
      limit: 10,
      // directionIds: currentDirections?.map(item => item.id),
      // subDirectionIds: value.map(item => Number(item)),
    }));
  };

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
        {sideFilterData.length == 0 && loadingSideFilter ? (
          <SideFIlterSkeleton />
        ) : sideFilterData.length == 0 && !loadingSideFilter ? (
          <Empty text="Үр дүн олдсонгүй." />
        ) : (
          sideFilterData?.map((el, index) => {
            return (
              <View key={index} style={styles.eachDir}>
                <View style={styles.filterRowData}>
                  <Text style={styles.filterRowDataTitle}>{el.name}</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                  }}
                >
                  {el.subDirections?.map((child, index2) => {
                    const checkOpen = expanded[index + "-" + index2];
                    const checkedItem = checked[index + "-" + index2];
                    return (
                      <CheckBox
                        containerStyle={styles.checkboxContainerStyle}
                        textStyle={styles.checkboxTextStyle}
                        title={
                          <View style={styles.checkboxTextContainer}>
                            <Text style={{ width: "90%" }}>{child.name}</Text>
                            <Text style={{ width: "5%" }}>
                              {child.advertisements?.length}
                            </Text>
                          </View>
                        }
                        checked={checkedItem}
                        onPress={() => {
                          setChecked((prevState) => ({
                            ...prevState,
                            [index + "-" + index2]:
                              !prevState[index + "-" + index2],
                          }));
                        }}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor={MAIN_COLOR}
                        uncheckedColor="#798585"
                        key={index2}
                      />
                    );
                  })}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default SideBarFilter;

const styles = StyleSheet.create({
  dirContainer: {
    flexGrow: 1,
    flexDirection: "column",
    paddingTop: 10,
  },
  eachDir: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    marginBottom: 10,
    paddingBottom: 10,
  },
  checkboxContainerStyle: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginBottom: 10,
  },
  checkboxTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 5,
  },
  checkboxTextStyle: {
    color: "#798585",
    fontWeight: "500",
    marginLeft: 5,
  },
  filterRowData: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 3,
  },
  filterRowDataTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 5,
  },
});
