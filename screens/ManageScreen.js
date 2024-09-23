import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  Card,
  Spinner,
  Theme,
} from "tamagui";
import { Spinning } from "../components/Spinning";

export const ManageScreen = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection("users")
      .onSnapshot(
        (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setUsers(users);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching users:", error);
          Alert.alert("Error", "Failed to fetch users. Please try again.");
          setIsLoading(false);
        }
      );

    return () => subscriber();
  }, []);

  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("Name cannot be blank");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateAge = (age) => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 16) {
      setAgeError("Age must be greater than 16");
      return false;
    }
    setAgeError("");
    return true;
  };

  const validateInputs = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isAgeValid = validateAge(age);
    return isNameValid && isEmailValid && isAgeValid;
  };

  const addUser = () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    firestore()
      .collection("users")
      .add({
        name: name.trim(),
        email: email.trim(),
        age: parseInt(age.trim()),
      })
      .then(() => {
        setName("");
        setEmail("");
        setAge("");
        Alert.alert("Success", "User added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        Alert.alert("Error", "Failed to add user. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const editUser = (id) => {
    if (!validateInputs()) return;

    setIsLoading(true);
    firestore()
      .collection("users")
      .doc(id)
      .update({
        name: name.trim(),
        email: email.trim(),
        age: parseInt(age.trim()),
      })
      .then(() => {
        setEditingId(null);
        setName("");
        setEmail("");
        setAge("");
        Alert.alert("Success", "User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        Alert.alert("Error", "Failed to update user. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const deleteUser = (id) => {
    setIsLoading(true);
    firestore()
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Success", "User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        Alert.alert("Error", "Failed to delete user. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  const renderUser = ({ item }) => (
    <Card
      elevate
      size="$4"
      marginVertical="$2"
      marginHorizontal="$4"
      backgroundColor="$backgroundStrong"
    >
      <Card.Header padded>
        <Text fontSize="$5" fontWeight="bold">
          {item.name ? item.name : "Unknown"}
        </Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <Text fontSize="$3">{item.email ? item.email : "No Email"}</Text>
            <Text fontSize="$3">
              {item.age ? `Age: ${item.age}` : "No Age"}
            </Text>
          </YStack>
          <XStack space="$2">
            <Button
              size="$3"
              theme="blue"
              onPress={() => {
                setEditingId(item.key);
                setName(item.name);
                setEmail(item.email);
                setAge(item.age.toString());
              }}
            >
              Edit
            </Button>
            <Button size="$3" theme="red" onPress={() => deleteUser(item.key)}>
              Delete
            </Button>
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  );

  const renderHeader = () => (
    <YStack space="$4" padding="$4">
      <Input
        size="$4"
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          validateName(text);
        }}
      />
      {nameError ? <Text color="$red10">{nameError}</Text> : null}
      <Input
        size="$4"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
      />
      {emailError ? <Text color="$red10">{emailError}</Text> : null}
      <Input
        size="$4"
        placeholder="Age"
        value={age}
        onChangeText={(text) => {
          setAge(text);
          validateAge(text);
        }}
        keyboardType="numeric"
      />
      {ageError ? <Text color="$red10">{ageError}</Text> : null}
      {editingId ? (
        <Button
          theme="green"
          alignSelf="center"
          width="100%"
          size="$4"
          onPress={() => editUser(editingId)}
        >
          Update User
        </Button>
      ) : (
        <Button
          theme="green"
          alignSelf="center"
          width="100%"
          size="$4"
          onPress={addUser}
        >
          Add User
        </Button>
      )}
    </YStack>
  );

  const sortUsers = (criteria) => {
    let sortedUsers = [...users];
    switch (criteria) {
      case "name-asc":
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "age-asc":
        sortedUsers.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        sortedUsers.sort((a, b) => b.age - a.age);
        break;
      default:
        break;
    }
    setUsers(sortedUsers);
    setSortCriteria(criteria);
  };

  return (
    <Theme name="light">
      <YStack space="$2" flex={1}>
        {isLoading && (
          <YStack alignItems="center" marginVertical="$4">
            <Spinner size="large" color="$blue10" />
          </YStack>
        )}
        {renderHeader()}
        <XStack space="$2" padding="$4" justifyContent="center">
          <Button size="$3" onPress={() => sortUsers("name-asc")}>
            Sort Name A-Z
          </Button>
          <Button size="$3" onPress={() => sortUsers("name-desc")}>
            Sort Name Z-A
          </Button>
          <Button size="$3" onPress={() => sortUsers("age-asc")}>
            Sort Age Low-High
          </Button>
          <Button size="$3" onPress={() => sortUsers("age-desc")}>
            Sort Age High-Low
          </Button>
        </XStack>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "$background",
          }}
        />
      </YStack>
    </Theme>
  );
};
