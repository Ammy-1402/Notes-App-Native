import React, { useEffect, useState } from 'react';
import { Alert, View, Text, SafeAreaView, ScrollView, StyleSheet, BackHandler, Platform, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import ModalActivityIndicator from '../../components/ModalActivityIndicator';
import CONST from '../../js/constants/constants';
import ModalComponent from '../../components/ModalComponent';
import * as authActions from '../../js/actions/authActions';
import TextInputComponent from '../../components/TextInputComponent';
import { windowHeight } from '../../utils/Dimensions';

const LoginScreen = (props) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [modelFlag, setModelFlag] = useState(true)
    //
    const loginError = useSelector(state => state.authReducer.loginError)
    const loading = useSelector(state => state.authReducer.loading)
    const loginErrorFlag = useSelector(state => state.authReducer.loginErrorFlag)
    const dispatch = useDispatch();
    //
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        }
    }, [])

    const handleBackButtonClick = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    const onChangeInput = (input, type) => {
        switch (type) {
            case "email":
                setEmail(input)
                break;
            case "password":
                setPassword(input)
                break;
            default:
                break;
        }
    }

    const handleModel = (msg) => {
        setModelFlag(false);
        if (msg === "error") {
            dispatch(authActions.resetState())
        }
        props.navigation.push('Login')
    }

    const onSubmit = () => {
        if (email === null || password === null) {
            Alert.alert(
                "Field is empty !!",
                "Kindly enter \"Email\" and \"Password\" ",
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            return null;
                        },
                    }
                ]
                , { cancelable: false })
        } else {
            let userData = {
                email: email.toLowerCase(),
                password: password
            }
            setEmail(null)
            setPassword(null) 
            dispatch(authActions.auth(userData))
        }
        setModelFlag(true)
    }

    if (loading) {
        return (
            <ModalActivityIndicator
                show={loading}
                loadingMessage={"Validating credentials"}
            />
        )
    }

    if (loginErrorFlag) {
        switch (loginError) {
            case CONST.ERRORCODE_WRONG_PASSWORD:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Ops !"}
                    subtitle={"Wrong Password"}
                    message={"Kindly enter correct password"}
                    onPress={() => handleModel("error")}
                />
            case CONST.ERRORCODE_USER_NOT_FOUND:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Ops !"}
                    subtitle={"User not found with this email address."}
                    message={"Kindly login with different email address."}
                    onPress={() => handleModel("error")}
                />
            case CONST.ERRORCODE_USER_DISABLED:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Error !"}
                    subtitle={"Server Error !"}
                    message={"Kindly bear with us we are working on it."}
                    onPress={() => handleModel("error")}
                />
            case CONST.ERRORCODE_INVALID_EMAIL:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Ops !"}
                    subtitle={"Invalid email !"}
                    message={"Kindly enter valid email"}
                    onPress={() => handleModel("error")}
                />
            default:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Error !"}
                    subtitle={"Ops!!..Something went wrong."}
                    message={"Please try again later."}
                    onPress={() => handleModel("error")}
                />
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/authImages/welcome.png')} />
            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.textHeadContainer}>
                    <Text style={styles.textHead}>Login</Text>
                    {windowHeight > 593 ? <View></View> : <Text style={styles.textScroll}>{"Scroll for more\noptions"}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={email}
                        placeholder={"Email"}
                        onChangeText={(input) => onChangeInput(input, "email")}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={password}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChangeText={(input) => onChangeInput(input, "password")}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.submitButtonStyle}
                        activeOpacity={.5}
                        onPress={onSubmit}
                    >
                        <Text style={styles.submitTextStyle}> LOGIN </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.goToRegister}>
                    <Text style={styles.registerLinkText}>New to Notes..?</Text>
                    <TouchableOpacity
                        onPress={() => { props.navigation.navigate('Register') }}
                    >
                        <Text style={styles.registerLink}> Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            showMessage({
                                message: "Ops!",
                                description: "We are updating our app, kindly bear with us",
                                type: "success",
                                backgroundColor: "#00bfff",
                                color: "white",
                            })
                        }}
                    >
                        <View style={styles.googleContainer}>
                            <Image style={styles.googleImage} source={require('../../assets/authImages/google.png')} />
                            <Text style={styles.textBottom}> Login with Google</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            showMessage({
                                message: "Ops!",
                                description: "We are updating our app, kindly bear with us",
                                type: "success",
                                backgroundColor: "#00bfff",
                                color: "white",
                            })
                        }}
                    >
                        <View style={styles.fbContainer}>
                            <Image style={styles.fbImage} source={require('../../assets/authImages/facebook.png')} />
                            <Text style={styles.textBottom}> Login with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    imageContainer: {
        width: "100%",
        height: windowHeight > 593 ? 180 : 150,
        borderBottomLeftRadius: 90,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4
    },
    image: {
        width: "100%",
        height: windowHeight > 593 ? 180 : 140,
        borderBottomLeftRadius: 90,
        overflow: "hidden"
    },
    textHeadContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: windowHeight > 593 ? 28 : 8,
        paddingHorizontal: 32,
        paddingVertical: 24
    },
    textHead: {
        fontSize: 32,
        fontFamily: "roboto-mono-regular",
    },
    textScroll: {
        fontSize: 9,
        fontFamily: "open-sans-light",
    },
    inputContainer: {
        paddingHorizontal: 28,
        paddingVertical: 8,
    },
    btnContainer: {
        marginVertical: 8,
        paddingHorizontal: 32
    },
    submitButtonStyle: {
        marginVertical: windowHeight > 593 ? 12 : 4,
        paddingVertical: 16,
        marginHorizontal: 46,
        backgroundColor: '#5AA6F1', //00BDC4
        borderRadius: 20,
        elevation: 10,
        borderColor: '#fff'
    },
    submitTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold"
    },
    goToRegister: {
        marginHorizontal: 32,
        marginTop: windowHeight > 593 ? 16 : 8,
        marginBottom: windowHeight > 593 ? 42 : 8,
        padding: 8,
        flexDirection: "row"
    },
    registerLinkText: {
        fontSize: 15,
        fontFamily: "roboto-regular"
    },
    registerLink: {
        color: "#00bfff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "roboto-regular"
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: Platform.OS === "ios" ? "#F8F8F8" : "#ECECEC",
        marginBottom: 0,
        height: Platform.OS === "ios" ? 200 : 150,
        width: "100%",
        alignContent: "flex-end",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: -3 },
        elevation: 30,
        paddingHorizontal: 32,
        paddingVertical: 24
    },
    googleImage: {
        width: 20,
        height: 20
    },
    fbImage: {
        width: 20,
        height: 20
    },
    googleContainer: {
        backgroundColor: "#484848",
        borderRadius: 18,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 }
    },
    fbContainer: {
        backgroundColor: "#484848",
        borderRadius: 18,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 }
    },
    textBottom: {
        fontSize: 14,
        fontFamily: "roboto-regular",
        color: "white"
    }
})

export default LoginScreen