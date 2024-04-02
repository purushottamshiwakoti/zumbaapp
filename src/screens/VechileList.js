import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import useAuthStore from "../hooks/useAuth,";
import { apiUrl } from "../lib/url";
import axios from "axios";
import { Button } from "react-native-paper";

const VechileList = () => {
  const navigation = useNavigation();
  const { id } = useAuthStore();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVechileList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}/vechicle/${id}`);
      const { vehicle } = res.data;
      setData(vehicle);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVechileList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getVechileList();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {isLoading ? (
            <Text>Loading....</Text>
          ) : data[0]?.vehicle ? (
            data[0].vehicle.map((item, index) => (
              <ScrollView>
                <View style={styles.container}>
                  <Text style={styles.title}>Vehicle Name:</Text>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.title}>Vehicle Number:</Text>
                  <Text style={styles.text}>{item.number}</Text>
                  <Text style={styles.title}>Vehicle Type:</Text>
                  <Text style={styles.text}>{item.type}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("VehicleDetail", { id: item.id })
                    }
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ))
          ) : (
            <Text>No vehicles added yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default VechileList;
