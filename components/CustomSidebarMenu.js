import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../firebase/config'

const CustomSidebarMenu = (props) => {
    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{ fontSize: 25, color: '#307ecc' }}>
                        {props.userEmail.toUpperCase().charAt(0)}
                    </Text>
                </View>
                <View style={stylesSidebar.profileHeaderContainer}>
                    <Text style={stylesSidebar.profileHeaderText}>Hello !</Text>
                    <Text style={stylesSidebar.profileHeaderText}>
                        {props.userEmail}
                    </Text>
                </View>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={({ color }) =>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View>
                                <Icon.Button
                                    name="sign-out"
                                    backgroundColor="#f9f9f9"
                                    color='black'
                                />
                            </View>
                            <Text style={{ color: 'black', marginLeft: 14, fontWeight: "bold", paddingLeft: 16 }}>
                                Logout
                            </Text>
                        </View>
                    }
                    onPress={() => {
                        props.navigation.toggleDrawer();
                        Alert.alert(
                            'Logout',
                            'Are you sure ?\nYou want to logout ?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        firebase.auth().signOut().then(() => {
                                            AsyncStorage.removeItem("isLoggedIn").then(() => {});
                                        }).catch((error) => {});
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
};

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'column',
        backgroundColor: '#878787',
        padding: 8,
        textAlign: 'center',
        elevation: 8,
        alignItems:"center",
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    profileHeaderContainer: {
        flexDirection: "column",
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    profileHeaderText: {
        color: 'white',
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 10,
        backgroundColor: '#a4a4a4',
        marginTop: 15,
    },
});

export default CustomSidebarMenu;