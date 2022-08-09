import { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

import { apiBaseURL } from "../constants/api";
export const RegisterScreen = () => {
  return (
    <View style={{ color: "blue", left: 20, top: 20 }}>
      <Text style={{ color: "blue", fontSize: 25 }}>Register Screen</Text>
      <FormInput></FormInput>
    </View>
  );
};

const FormInput = ({navigation}) => {
  const [data, setData] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    message: ""
  })

  const register = async () => {
    try {
      const form = new FormData();
      form.append("user-email", data.email);
      form.append("user-phone", data.phoneNumber);
      form.append("user-name", data.username);
      form.append("user-password", data.password);
      const response = await fetch(`${apiBaseURL}/account/register`, {
        method: "POST",
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
        },
        body:form
      });
      const json=await response.json()
      const errorCode = json.data['error-code']
      if (errorCode==='2'){
        setError({message:json.data['message']})
      }
      else {navigation.push('login')}
    } catch (error) {}
  };

  return (
    <View style={{ top: 10 }}>
      {/* Input Email */}
      <Text>{error.message}</Text>
      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, width: 250 }}
        placeholder="Masukkan Email"
        onChangeText={(newEmail) => setData({ ...data, email: newEmail })}
      ></TextInput>
      {/* Input Phone Number */}
      <Text>Phone Number</Text>
      <TextInput
        style={{ borderWidth: 1, width: 250 }}
        placeholder="Masukkan Nomor Telepon"
        onChangeText={(newPhone) => setData({ ...data, phoneNumber: newPhone })}
      ></TextInput>
      {/* Input Nama Lengkap */}
      {/* <Text>{data.username}</Text> */}
      <Text>Nama Lengkap</Text>
      <TextInput
        style={{ borderWidth: 1, width: 250 }}
        placeholder="Masukkan Nama Lengkap"
        onChangeText={(newUsername) =>
          setData({ ...data, username: newUsername })
        }
      ></TextInput>
      {/* Input Password */}
      {/* <Text>{data.password}</Text> */}
      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, width: 250 }}
        placeholder="Masukkan Password"
        onChangeText={(newPassword) =>
          setData({ ...data, password: newPassword })
        }
        secureTextEntry
      ></TextInput>
      <Button title="Submit" color="blue" onPress={() => register()}></Button>
    </View>
  );
};
