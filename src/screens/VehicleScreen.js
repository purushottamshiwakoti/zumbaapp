import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import VechileList from "./VechileList";

const VehicleScreen = ({ navigation }) => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <SafeAreaView>
        <View style={{ marginTop: 10 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("AddVehicle")}
          >
            Add Vehicle
          </Button>
        </View>
        <View style={{ marginTop: 10 }}>
          <VechileList />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VehicleScreen;
