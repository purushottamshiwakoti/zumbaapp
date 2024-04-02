import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "../lib/url";

const AddProgress = ({ route }) => {
  const { id } = route.params;
  const [progress, setProgress] = useState("");
  const navigation = useNavigation();

  const handleAddProgress = async () => {
    try {
      const res = await axios.post(`${apiUrl}/add-progress`, {
        userId: id,
        report: progress,
      });
      const { message } = res.data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Progress" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.heading}>Enter Progress</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter progress"
          value={progress}
          onChangeText={(text) => setProgress(text)}
        />
        <Button title="Add Progress" onPress={handleAddProgress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddProgress;
