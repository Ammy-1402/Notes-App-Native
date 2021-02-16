import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import firebase from '../../firebase/config'
import LoadingComponent from '../../components/LoadingComponent';
import NoteTextInputComponent from '../../components/NoteTextInputComponent';

const SettingsScreen = (props) => {

    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        return () => {
            console.log('Settings cleanup')
            setLoading(false)
            setPassword("")
            setConfirmPassword("")
        }
    }, [])

    const handleChange = (input, type) => {
        switch (type) {
            case "password":
                setPassword(input)
                break;
            case "confirmPassword":
                setConfirmPassword(input)
                break;
            default:
                break;
        }
    }

    const btnClick = () => {
        setLoading(true)
        var user = firebase.auth().currentUser;
        if (user) {
            console.log('valid')
        } else {
            console.log('not valid')
        }
        let email = user.providerData[0].email
        if (password === "" || confirmPassword === "") {
            setLoading(false)
            Alert.alert(
                "Field is empty !!",
                "Kindly enter \"New Password\" OR \"Confirm New Password\" ",
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            return null;
                        },
                    }
                ]
                , { cancelable: false })
        } else if (password.localeCompare(confirmPassword) !== 0) { //string equal
            setLoading(false)
            Alert.alert(
                "Match Error",
                "\"New Password\" OR \"Confirm New Password\" does not match",
                [
                    {
                        text: 'Close',
                        onPress: () => {
                            return null;
                        },
                    }
                ]
                , { cancelable: false })
        } else if (password.length < 6 || confirmPassword.length < 6) {
            setLoading(false)
            Alert.alert(
                "Password Error.",
                "Password must be 6 characters long",
                [
                    {
                        text: 'Close',
                        onPress: () => {
                            return null;
                        },
                    }
                ]
                , { cancelable: false })
        } else {
            let updateNoteData = {
                password: password
            }
            firebase.firestore().collection('users').doc(email).update(updateNoteData).then((res) => {
                console.log('updated password result: ', res)
                // 
                user.updatePassword(password).then((result) => {
                    console.log('result: ', result)
                    setLoading(false)
                    Alert.alert(
                        "Password Change Successfull !",
                        "Your password has been updated..",
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    props.navigation.navigate('ProfileScreen')
                                },
                            }
                        ]
                        , { cancelable: false })
                }).catch(function (error) {
                    // An error happened.
                    setLoading(false)
                    Alert.alert(
                        "Authentication Error !",
                        "Kindly Logout and Login again to change your password ",
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    return null;
                                },
                            }
                        ]
                        , { cancelable: false })
                    console.log('error: ', error)
                });
            }).catch((err) => {
                console.log('updated password error: ', err)
                setLoading(false)
                Alert.alert(
                    "Error Occured !!",
                    "Kindly Logout and Login again to change your password ",
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                return null;
                            },
                        }
                    ]
                    , { cancelable: false })
            })
        }
    }

    if (loading) {
        return <LoadingComponent style={{ margin: 32 }} />
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.passwordContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>New Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <NoteTextInputComponent
                            onChangeText={
                                (input) => handleChange(input, "password")
                            }
                        />
                    </View>
                </View>
                <View style={styles.confirmPasswordContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Confirm New Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <NoteTextInputComponent
                            onChangeText={
                                (input) => handleChange(input, "confirmPassword")
                            }
                        />
                    </View>
                </View>
                <View style={styles.btn}>
                    <Button
                        title="Update"
                        onPress={btnClick}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    passwordContainer: {
        marginVertical: 20
    },
    textContainer: {
        marginBottom: 10
    },
    btn: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 20
    }
})

export default SettingsScreen