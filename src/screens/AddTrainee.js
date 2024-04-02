import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { apiUrl } from "../lib/url";

const AddTrainee = () => {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [experiance, setExperiance] = React.useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${apiUrl}/trainee`, {
        name,
        description,
        experiance,
      });
      const { message } = res.data;
      alert(message);
      navigation.navigate("AdminTrainee");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Go Back" />
      </Appbar.Header>
      <View style={{ padding: 10 }}>
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          AddTrainee
        </Text>
        <View>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ marginTop: 10 }}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={{ marginTop: 10, height: 100 }} // Adjust the height value as needed
          />
          <TextInput
            label="Experiance"
            value={experiance}
            onChangeText={(text) => setExperiance(text)}
            numberOfLines={10}
            style={{ marginTop: 10 }}
            keyboardType="number-pad"
          />
        </View>
        <Button
          style={{ marginTop: 10 }}
          mode="contained"
          onPress={handleAdd}
          disabled={!name || !description || !experiance}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default AddTrainee;
