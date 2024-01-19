import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RegisterScreen } from "../../features/account/screen/register.screen";
import { LoginScreen } from "../../features/account/screen/login.screen";
import { AccountScreen } from "../../features/account/screen/account.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
