import { createContext, useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState({
    message: "",
  });

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    if (userId != "" && password != "") {
      const form = new FormData();
      form.append("user-id", userId);
      form.append("user-password", password);
      const response = await fetch("https://mustseeum.com/api/account/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "multipart/form-data",
        },
        body: form,
      });
      const json = await response.json();
      const errorCode = json["error-code"];
      if (errorCode === "1") {
        setError({
          message: json["message"],
        });
      } else {
        navigation.push("destinations");
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={userId}
          placeholder="Enter user id"
          onChangeText={(text) => setUserId(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter user password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Text>{error.message}</Text>
        <Button
          title="Login"
          onPress={() => {
            signin();
          }}
        ></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  error: {
    color: "red",
    marginLeft: 20,
  },
});
