import { Alert, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper"; // Import TextInput from react-native-paper
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Toast from "react-native-toast-message";
import { apiUrl } from "../lib/url";
import { Colors } from "../colors";
import { registerSchema } from "./schemas";
import useAuthStore from "../hooks/useAuth,";

const RegisterScreen = ({ navigation, route }) => {
  const { name } = route.params;
  console.log(name);
  const { setId, setUserName, setUserRole } = useAuthStore();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password, fullName, location } = data;

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/register`, {
        email: email,
        password: password,
        fullName: fullName,
        location: location,
        role: name,
      });

      console.log("Signup successful:", res.data);
      const { message, user } = res.data;
      setId(user.id);
      setUserName(user.fullName);
      setUserRole(user.role);

      navigation.navigate("Home");
      Toast.show({
        type: "success",
        text1: message,
      });

      // Handle success response here
    } catch (error) {
      console.error("Signup failed:");
      const { message } = error.response.data;
      Toast.show({
        type: "error",
        text1: message,
      });
      // Handle error response here
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: Colors.primary,
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        Create a new account
      </Text>
      <View style={{ width: "95%", marginTop: 10 }}>
        {/* Adjust the width as needed */}

        <Controller
          control={control}
          name={"fullName"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            // <TextInput

            <>
              <TextInput
                label="Full Name"
                placeholder="Enter your full name here"
                value={value}
                style={{
                  width: "100%",
                  color: Colors.primary,
                  borderRadius: 20,
                }}
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
          name={"email"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            // <TextInput

            <>
              <TextInput
                label="Email"
                placeholder="Enter your email address here"
                value={value}
                style={{
                  width: "100%",
                  color: Colors.primary,
                  borderRadius: 20,
                  marginTop: 10,
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
          name={"password"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="Password"
                placeholder="Enter your password here"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  width: "100%",
                  color: Colors.primary,
                  borderRadius: 20,
                  marginTop: 10,
                }}
                secureTextEntry
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
          name={"location"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="Location"
                placeholder="Enter your location here"
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
          icon="logout"
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
          Register
        </Button>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text
            variant="bodyMedium"
            style={{
              textAlign: "right",
            }}
          >
            Already have an account
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 3 }}
            onPress={() => navigation.navigate("Login", { name })}
          >
            <Text style={{ color: Colors.primary }}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
