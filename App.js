import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import AuthNavigation from './routes/AuthNavigation';
import DrawerNavigation from './routes/DrawerNavigation';
import OnBoardingScreen from './screens/OnBoardingScreen';
import firebase from './firebase/config';
import * as authActions from './js/actions/authActions';
import LoadingComponent from './components/LoadingComponent';

const App = () => {

  const Stack = createStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [oldUser, setOldUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //
  const loginSuccess = useSelector(state => state.authReducer.loginSuccess);
  const dispatch = useDispatch();
  //

  const checkLoggedInUser = () => {
    AsyncStorage.getItem("isLoggedIn").then(value => {
      if (value) {
        setOldUser(true)
        setIsLoggedIn(true)
        setLoading(false)
      } else {
        setIsLoggedIn(false)
      }
    })
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      checkLoggedInUser()
    } else {
      checkLoggedInUser()
      dispatch(authActions.resetState())
    }
  });

  const _CheckUser = () => {
    AsyncStorage.getAllKeys().then(value => {
      if (!value.length) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
        setOldUser(false)
        setLoading(false)
      } else {
        AsyncStorage.getItem("oldUser").then(value => {
          if (value) {
            setOldUser(true)
            setIsFirstLaunch(false);
            setLoading(false)
          } else {
            setOldUser(false)
            setIsFirstLaunch(false);
            setLoading(false)
          }
        })
      }
    })
  }

  useEffect(() => {
    _CheckUser()
    return () => {
    }
  }, [])

  if (loading) {
    return (
      <LoadingComponent />
    )
  } else {
    if (isFirstLaunch === null) {
      return null
    } else if (oldUser) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {
              (loginSuccess || isLoggedIn) ?
                <Stack.Screen
                  name="Inner"
                  component={DrawerNavigation}
                  options={{ headerShown: false }}
                />
                :
                <Stack.Screen
                  name="Auth"
                  component={AuthNavigation}
                  options={{ headerShown: false }}
                />
            }
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else if (isFirstLaunch && (oldUser === false)) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OnBoarding"
              component={OnBoardingScreen}
              options={{ headerShown: false }}
            />
            {
              (loginSuccess || isLoggedIn) ?
                <Stack.Screen
                  name="Inner"
                  component={DrawerNavigation}
                  options={{ headerShown: false }}
                />
                :
                <Stack.Screen
                  name="Auth"
                  component={AuthNavigation}
                  options={{ headerShown: false }}
                />
            }
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return null;
    }
  }
}

export default App;