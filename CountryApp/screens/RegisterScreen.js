import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { API } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const registerUser = async () => {

  alert("Register clicked");

  console.log("Sending request...");

  try {

    const response = await API.post(
      "/register/",
      {
        username,
        email,
        password,
      }
    );

    console.log("SUCCESS:", response.data);

    Alert.alert(
      "Success",
      "Registration Successful"
    );

    navigation.navigate("Login");

  } catch (error) {

   console.log("MESSAGE:", error.message);
console.log("STATUS:", error.response?.status);
console.log("DATA:", error.response?.data);

    console.log(
      "ERROR RESPONSE:",
      error.response?.data
    );

    Alert.alert(
      "Error",
      error.message
    );
  }
};
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Register
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={registerUser}
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

     <TouchableOpacity
  onPress={() => navigation.navigate("Login")}
  style={{
    marginTop: 15,
  }}
>
  <Text
    style={{
      textAlign: "center",
      color: "blue",
    }}
  >
    Already have an account? Login
  </Text>
</TouchableOpacity>
    </View>
  );
}