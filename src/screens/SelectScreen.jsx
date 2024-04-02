import { View, StatusBar } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SelectScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        padding: 10,
      }}
    >
      <View style={{ marginVertical: 20 }}>
        <Card>
          <Card.Cover
            source={{
              uri: "https://media.istockphoto.com/id/1364125256/photo/dancing-for-fitness.jpg?s=612x612&w=0&k=20&c=TfpzIhNdU_uVxYOFK45LBCVwmFhMlZxqAM2N_b74CrE=",
            }}
          />
          <Card.Actions>
            <Button
              onPress={() =>
                navigation.navigate("Login", {
                  name: "ADMIN",
                })
              }
            >
              Continue as Admin
            </Button>
          </Card.Actions>
        </Card>
      </View>
      <Card style={{ marginTop: 20 }}>
        <Card.Cover
          source={{
            uri: "https://media.istockphoto.com/id/1134374645/photo/dancing-together.jpg?s=612x612&w=0&k=20&c=B_ueFxHPsmn1C6HmwMI6R1-C5h8If1Np7hF5Z39mXHQ=",
          }}
        />
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("Login", {
                name: "USER",
              })
            }
          >
            Continue as User
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default SelectScreen;
