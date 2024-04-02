import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { apiUrl } from "../lib/url";

const DetailVehicleList = ({ route }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isServicingDatePickerVisible, setServicingDatePickerVisibility] =
    useState(false);
  const [date, setDate] = useState(null);
  const [servicingDate, setServicingDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { id } = route.params;

  const getVehicleList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiUrl}/vechile-detail/${id}`);
      const { vehicle } = res.data;
      setData(vehicle);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVehicleList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getVehicleList();
    }, [])
  );

  const handleRequestPickup = async () => {
    try {
      const res = await axios.post(`${apiUrl}/pickup`, {
        vehilceId: id,
        date,
      });
      const { message } = res.data;
      alert("Successfully requested pickup");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleRequestServicing = async () => {
    try {
      const res = await axios.post(`${apiUrl}/servicing`, {
        vehilceId: id,
        date: servicingDate,
      });
      const { message } = res.data;
      alert("Successfully requested servicing");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  console.log(data[0]?.servicing);

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Go Back" />
        </Appbar.Header>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>Vehicle Name:</Text>
            <Text style={styles.text}>{data[0]?.name}</Text>
            <Text style={styles.title}>Vehicle Number:</Text>
            <Text style={styles.text}>{data[0]?.number}</Text>
            <Text style={styles.title}>Vehicle Type:</Text>
            <Text style={styles.text}>{data[0]?.type}</Text>
            <View style={styles.buttonContainer}>
              {date == null ? (
                <Button
                  title="Request Pickup"
                  onPress={() => setDatePickerVisibility(true)}
                />
              ) : (
                <View>
                  <Text>Selected Date: {date.toISOString().split("T")[0]}</Text>
                  <Button title="Clear" onPress={() => setDate(null)} />
                  <View style={{ marginTop: 5 }}>
                    <Button title="Request" onPress={handleRequestPickup} />
                  </View>
                </View>
              )}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setDate(date);
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            <View style={styles.buttonContainer}>
              {servicingDate == null ? (
                <Button
                  title="Request Servicing"
                  onPress={() => setServicingDatePickerVisibility(true)}
                />
              ) : (
                <View>
                  <Text>
                    Selected Date: {servicingDate.toISOString().split("T")[0]}
                  </Text>
                  <Button
                    title="Clear"
                    onPress={() => setServicingDate(null)}
                  />
                  <View style={{ marginTop: 5 }}>
                    <Button title="Request" onPress={handleRequestServicing} />
                  </View>
                </View>
              )}
              <DateTimePickerModal
                isVisible={isServicingDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setServicingDate(date);
                  setServicingDatePickerVisibility(false);
                }}
                onCancel={() => setServicingDatePickerVisibility(false)}
              />
            </View>
          </View>
        )}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Pickup Requested Dates</Text>
          {data[0]?.pickUp.map((item, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.cardText}>
                Date: {item.date?.split("T")[0]}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Servicing Requested Dates</Text>
          {data[0]?.servicing.map((item, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.cardText}>
                Date: {item.date?.split("T")[0]}
              </Text>
            </View>
          ))}
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
  buttonContainer: {
    marginTop: 10,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
  },
});

export default DetailVehicleList;
