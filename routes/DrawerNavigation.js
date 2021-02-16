import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/DrawerScreens/Home/HomeScreen';
import AboutScreen from '../screens/DrawerScreens/AboutScreen';
import ProfileScreen from '../screens/DrawerScreens/ProfileScreen';
import EditeNoteScreen from '../screens/DrawerScreens/Home/EditNoteScreen';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import firebase from '../firebase/config';
import AsyncStorage from '@react-native-community/async-storage';
import AddNoteScreen from '../screens/DrawerScreens/Home/AddNoteScreen';
import SettingsScreen from '../screens/DrawerScreens/SettingsScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const homeScreenStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Notes', //Set Header Title
                    headerLeft: () => (
                        <View style={{ marginLeft: 5 }}>
                            <Icon.Button
                                name="bars"
                                backgroundColor="#307ecc"
                                onPress={() => props.navigation.toggleDrawer()}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        // fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="EditNoteScreen"
                component={EditeNoteScreen}
                options={{
                    title: 'Edit', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="AddNoteScreen"
                component={AddNoteScreen}
                options={{
                    title: 'Create Note', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    )
}

const aboutScreenStack = (props) => {
    return (
        // initialRouteName="AboutScreen"
        <Stack.Navigator>
            <Stack.Screen
                name="AboutScreen"
                component={AboutScreen}
                options={{
                    title: 'About', //Set Header Title
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="bars"
                                backgroundColor="#307ecc"
                                onPress={() => props.navigation.toggleDrawer()}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        // fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    )
}

const profileScreenStack = (props) => {
    return (
        // initialRouteName="ProfileScreen"
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Profile', //Set Header Title
                    headerLeft: () => (
                        <View style={{ marginLeft: 5 }}>
                            <Icon.Button
                                name="bars"
                                backgroundColor="#307ecc"
                                onPress={() => props.navigation.toggleDrawer()}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        // fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Change Password', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    )
}

const DrawerNavigation = (props) => {

    const [currentemail, setCurrentEmail] = useState("User")
    const [currentUID, setCurrentUID] = useState("Userid")
    useEffect(() => {
        AsyncStorage.getItem('email-id').then(value => {
            if(value){
                let spliData = value.split("-")
                setCurrentEmail(spliData[0])
                setCurrentUID(spliData[1])
            }
        })
    }, [])

    const userEmail = currentemail || firebase.auth().currentUser.email
    const userId = currentUID || "dummyUserId"
    // const userId = firebase.auth().currentUser.uid || "demoId"
    // const userId = "demoId"
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#7a7a7a',
                color: '#cee1f2',
                itemStyle: { marginVertical: 5, color: 'black' },
                labelStyle: {
                    color: 'black',
                    fontWeight: "bold",
                },
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomSidebarMenu {...props} userId={userId} userEmail={userEmail} />}
        >
            <Drawer.Screen
                name="HomeScreen"
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <View>
                            <Icon.Button
                                name="home"
                                style={{}}
                                backgroundColor={focused ? "#ebebeb" : "#f9f9f9"}
                                color={focused ? 'black' : 'black'}
                            />
                        </View>
                    )
                }}
                component={homeScreenStack}
            />
            <Drawer.Screen
                name="AboutScreen"
                options={{
                    drawerLabel: 'About',
                    drawerIcon: ({ focused, size }) => (
                        <View>
                            <Icon.Button
                                name="asterisk"
                                style={{}}
                                backgroundColor={focused ? "#ebebeb" : "#f9f9f9"}
                                color={focused ? 'black' : 'black'}
                            />
                        </View>
                    )
                }}
                component={aboutScreenStack}
            />
            <Drawer.Screen
                name="ProfileScreen"
                options={{
                    drawerLabel: 'Profile',
                    drawerIcon: ({ focused, size }) => (
                        <View style={{ paddingRight: 4 }}>
                            <Icon.Button
                                name="user"
                                style={{}}
                                backgroundColor={focused ? "#ebebeb" : "#f9f9f9"}
                                color={focused ? 'black' : 'black'}
                            />
                        </View>
                    )
                }}
                component={profileScreenStack}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;
