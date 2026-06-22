import React from "react";
import { View, Text } from "react-native";

export default function CountryDetail({ route }) {

  const country = route?.params?.country;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        {country.country_name}
      </Text>

      <View
        style={{
          backgroundColor: "#f2f2f2",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Country ID: {country.country_id}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Capital: {country.capital_city || "N/A"}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Name Length: {country.name_length}
        </Text>

        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Latitude: {country.latitude || "N/A"}
        </Text>

        <Text style={{ fontSize: 18 }}>
          Longitude: {country.longitude || "N/A"}
        </Text>
      </View>
    </View>
  );
}
   
  