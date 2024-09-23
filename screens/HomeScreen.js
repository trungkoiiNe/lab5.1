import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, View } from "tamagui";
// import { Button } from "../components";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { AuthenticatedUserContext } from "../providers";

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => console.log("Error logging out: ", error));
  };
  const handleManage = () => {
    navigation.navigate("ManageUsers");
  };
  return (
    <View style={styles.container} alignItems="center">
      <Button onPress={handleLogout} size={100} width={200} theme="blue">
        Sign Out
      </Button>

      <Button theme="blue" size={100} width={200} onPress={handleManage}>
        "Manage Users
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
