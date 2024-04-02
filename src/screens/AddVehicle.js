import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "./schemas";
import { Colors } from "../colors";
import useAuthStore from "../hooks/useAuth,";
import axios from "axios";
import { apiUrl } from "../lib/url";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const AddVehicle = () => {
  const navigation = useNavigation();
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      type: "",
      number: "",
    },
    resolver: zodResolver(vehicleSchema),
  });
  const onSubmit = async (data) => {
    const { name, type, number } = data;

    try {
      setIsLoading(true);
      console.log(`${apiUrl}/vechicle`);
      const res = await axios.post(`${apiUrl}/vechicle`, {
        name,
        type,
        number,
        userId: id,
      });

      const { message } = res.data;
      console.log(message);
      Toast.show({
        type: "success",
        text1: message,
      });

      navigation.goBack();
      // Handle success response here
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
      // Handle error response here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <SafeAreaView>
        <Text
          variant="headlineMedium"
          style={{ color: Colors.primary, fontWeight: "700" }}
        >
          Add Vehicle
        </Text>
        <View style={{ width: "95%", marginTop: 10 }}>
          {/* Adjust the width as needed */}
          <Controller
            control={control}
            name={"name"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              // <TextInput
              //   placeholder="email"
              //   style={styles.input}
              //   value={value}
              //   onChangeText={onChange}
              //   onBlur={onBlur}
              // />
              <>
                <TextInput
                  label="Vehicle Name"
                  placeholder="Enter your vehicle name here"
                  value={value}
                  style={{
                    width: "100%",
                    color: Colors.primary,
                    borderRadius: 20,
                  }}
                  keyboardType="email-address"
                  mode="outlined"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && (
                  <Text style={{ color: Colors.destructive, marginTop: 4 }}>
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name={"type"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  label="Vehicle Type"
                  placeholder="eg. car,bus,scooter"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    width: "100%",
                    color: Colors.primary,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                  mode="outlined"
                />
                {error && (
                  <Text style={{ color: Colors.destructive, marginTop: 4 }}>
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name={"number"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  label="Vehicle Number"
                  placeholder="Enter vehicle number here"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    width: "100%",
                    color: Colors.primary,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                  mode="outlined"
                />
                {error && (
                  <Text style={{ color: Colors.destructive, marginTop: 4 }}>
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />

          <Button
            icon="plus"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{
              marginTop: 20,
              height: 50,
              marginLeft: 0,
              marginRight: 0,
              justifyContent: "center",
              backgroundColor: Colors.primary,
            }}
            disabled={isLoading}
          >
            Add
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddVehicle;
