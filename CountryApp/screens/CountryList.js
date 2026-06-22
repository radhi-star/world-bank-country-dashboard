import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from "react-native";

import { API } from "../services/api";

export default function CountryList({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCountries = async (
    searchTerm = "",
    pageNumber = 1
  ) => {
    try {
      const response = await API.get(
        `/countries/?search=${searchTerm}&page=${pageNumber}`
      );

      setCountries(response.data.results);
      setPage(response.data.current_page);
      setTotalPages(response.data.total_pages);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Search
  useEffect(() => {
    fetchCountries(debouncedSearch, 1);
  }, [debouncedSearch]);

  // Polling
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCountries(debouncedSearch, page);
    }, 10000);

    return () => clearInterval(interval);
  }, [debouncedSearch, page]);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchCountries(
      debouncedSearch,
      page
    );

    setRefreshing(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        🌍 World Bank Countries
      </Text>

      <TextInput
        placeholder="Search Country..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
        }}
      />

      {countries.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          No countries found
        </Text>
      ) : (
        <>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={countries}
            keyExtractor={(item, index) =>
              item.country_id || index.toString()
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", {
                    country: item,
                  })
                }
                style={{
                  backgroundColor: "#ffffff",
                  padding: 15,
                  marginBottom: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#e5e5e5",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  {item.country_name}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 3,
                  }}
                >
                  Capital: {item.capital_city || "N/A"}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                  }}
                >
                  ID: {item.country_id}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              disabled={page === 1}
              onPress={() =>
                fetchCountries(
                  debouncedSearch,
                  page - 1
                )
              }
            >
              <Text
                style={{
                  fontSize: 18,
                  color:
                    page === 1
                      ? "gray"
                      : "blue",
                }}
              >
                Previous
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Page {page} of {totalPages}
            </Text>

            <TouchableOpacity
              disabled={page === totalPages}
              onPress={() =>
                fetchCountries(
                  debouncedSearch,
                  page + 1
                )
              }
            >
              <Text
                style={{
                  fontSize: 18,
                  color:
                    page === totalPages
                      ? "gray"
                      : "blue",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}