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
import useAuthStore from "../hooks/useAuth,";

const ViewProgress = () => {
  const navigation = useNavigation();
  const { id } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/progress/${id}`);
      const { report } = res.data;
      setData(report);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Update loading state after fetching data
    }
  };
  console.log({ data });

  const renderItem = ({ item }) => {
    console.log({ item }); // Add this line to log the item being rendered
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.report}</Title>
          <Paragraph>Added at {item.created_at.split("T")[0]}</Paragraph>
        </Card.Content>
      </Card>
    );
  };
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
          <FlatList data={data && data} renderItem={renderItem} />
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

export default ViewProgress;
