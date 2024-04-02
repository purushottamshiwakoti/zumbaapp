import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Appbar, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "../lib/url";

const ViewTrainee = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/trainee`);
      const { trainee } = res.data;
      setData(trainee);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Update loading state after fetching data
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Experience: {item.experience}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Go Back" />
      </Appbar.Header>
      {loading ? (
        // Display a loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        // Render the FlatList once data is loaded
        <View>
          <Text
            style={{ textTransform: "capitalize", padding: 10, fontSize: 18 }}
          >
            Join Us Or call Us 9878909878 to book zumba training
          </Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewTrainee;
