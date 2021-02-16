import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import firebase from '../../firebase/config';
import LoadingComponent from '../../components/LoadingComponent';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProfileScreen = (props) => {
    
    const [email, setEmail] = useState("")
    const [userId, setUserId] = useState("")

    const [userArr, setUserArr] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserData = (querySnapshot) => {
        setLoading(true)
        let userArr = [];
        if (!querySnapshot) {
            setLoading(false)
        } else {
            // console.log('here query')
            querySnapshot.forEach((res) => {
                const { email, firstname, lastname, password, uid, updatedAt, createdAt } = res.data();
                userArr.push({
                    uid,
                    firstname,
                    lastname,
                    email,
                    password,
                    createdAt,
                    updatedAt
                });
            })
            // console.log('userArr: ', userArr)
            setUserArr(userArr)
            setLoading(false)
        }
    }

    useEffect(() => {
        // setLoading(true)
        // console.log('here')
        let firebaseRef = null;
        AsyncStorage.getItem("email-id").then((value) => {
            let data = value.split("-")
            let currentUserId = data[1]
            setEmail(data[0])
            setUserId(data[1])
            // console.log('object', currentUserId)
            firebaseRef = firebase.firestore().collection('users').where("uid", "==", currentUserId);
            firebaseRef.onSnapshot(getUserData)
        }).catch((err) => {})
        return () => {
            firebaseRef.onSnapshot(getUserData)()
        }
    }, [])


    if (loading) {
        return <LoadingComponent style={{ margin: 32 }} />
    } else {
        return (
            <SafeAreaView>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Text
                                style={{ paddingBottom: 20, fontSize: 16,
                                 fontFamily: "open-sans-light" }}
                            >
                                Hey! {userArr[0].firstname + " " + userArr[0].lastname}
                            </Text>
                        </View>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                                {userArr[0].firstname.toUpperCase().charAt(0)}
                            </Text>
                            {/* <Image style={styles.img} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} /> */}
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.body}>
                                <View style={{ alignItems: "flex-end" }}>
                                    <TouchableOpacity  
                                        style={styles.editButtonContainer}
                                        onPress={() => {
                                            props.navigation.navigate('SettingsScreen', {
                                                userData: userArr
                                            })
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Icon
                                                name="edit"
                                                color="black"
                                                size={20}
                                                style={{ margin: 6 }}
                                            />
                                            <Text style={styles.editButtonText}>
                                                Edit
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.dataContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Firstname :</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>
                                            {userArr[0].firstname}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.line} />
                                <View style={styles.dataContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Lastname :</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>
                                            {userArr[0].lastname}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.line} />
                                <View style={styles.dataContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Email :</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>
                                            {userArr[0].email.toString()}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.line} />
                                <View style={styles.dataContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Password :</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>
                                            {userArr[0].password.replace(/./g, "*")}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
    },
    line: {
        height: 1,
        backgroundColor: '#e3e3e3',
        marginTop: 10,
        marginBottom: 10,
    },
    headerContainer: {
        height: 150,
        backgroundColor: "white",
        elevation: 8,
        borderWidth: 4,
        borderColor: "white",
        borderBottomColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    },
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 90,
        borderWidth: 4,
        borderColor: "grey",
        backgroundColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: "center",
        position: 'absolute',
        marginTop: 100,
        elevation: 8
    },
    avatarText: {
        width: 130,
        height: 130,
        borderRadius: 70,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 90,
        color: '#307ecc'
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 70,
        alignSelf: 'center',
    },
    body: {
        marginTop: 100,
        width: "90%",
        paddingHorizontal: 15,
        paddingVertical: 20,
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 15,
    },
    editButtonContainer: {
        borderRadius: 10,
        borderColor: "#bcbcbc",
        borderWidth: 1,
        elevation: 5,
        backgroundColor: "#d9d9d9",
        padding: 5,
        justifyContent: "center",
        elevation: 6,
        marginBottom: 20,
    },
    editBtn: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "red",
        justifyContent: "flex-end"
    },
    editButtonText: {
        fontSize: 16,
        paddingRight: 5
    },
    dataContainer: {
        flexDirection: "row"
    },
    textContainer: {
        flex: 0.5,
    },
    text: {
        fontSize: 18,
    },
    valueContainer: {
        flex: 1,
    },
    value: {
        fontSize: 18,
        fontFamily: "open-sans-light"
    }
})

export default ProfileScreen