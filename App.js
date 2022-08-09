import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DestinationsScreen } from "./screens/destinations-screen";
import { LoginScreen } from "./screens/login-screen";
import { RegisterScreen } from "./screens/register-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='register' component={RegisterScreen} />
        <Stack.Screen name='destinations' component={DestinationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
