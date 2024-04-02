import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Appbar, Button, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { apiUrl } from "../lib/url";

const AddDietPlans = () => {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${apiUrl}/diet`, {
        name: title,
      });
      const { message } = res.data;
      alert(message);
      navigation.navigate("AdminDiet");
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
          Add Diet Plan
        </Text>
        <View>
          <TextInput
            label="Name"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={{ marginTop: 10 }}
          />
        </View>
        <Button
          style={{ marginTop: 10 }}
          mode="contained"
          onPress={handleAdd}
          disabled={!title}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default AddDietPlans;
