import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await axios.post(
      "https://world-bank-country-dashboard-1.onrender.com/api/token/",
        {
          username,
          password,
        }
      );

      await AsyncStorage.setItem(
        "access_token",
        response.data.access
      );

      await AsyncStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      navigation.replace("Countries");

    } catch (error) {

      Alert.alert(
        "Login Failed",
        "Invalid username or password"
      );

    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        JWT Login
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={login}
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Register")
        }
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Create New Account
        </Text>
      </TouchableOpacity>

    </View>
  );
}