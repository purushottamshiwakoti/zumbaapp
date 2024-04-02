import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Searchbar, Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { area } from "../data/area"; // Import your area data here
import useAuthStore from "../hooks/useAuth,";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { fullName, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = area.filter((item) =>
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text variant="headlineMedium">Hello {fullName}</Text>
          <Button onPress={logout}>Logout</Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("AdminTrainee")}
          >
            Trainee
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Members")}
          >
            Members
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("AdminDiet")}
          >
            Diet Plans
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("AdminReport")}
          >
            Progress Report
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
