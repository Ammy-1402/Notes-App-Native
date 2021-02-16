import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name={"Login"}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Register"}
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )
}

export default AuthNavigation;
