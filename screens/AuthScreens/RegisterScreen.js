import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import TextInputComponent from '../../components/TextInputComponent';
import { windowHeight } from '../../utils/Dimensions';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../js/actions/authActions';
import ModalComponent from '../../components/ModalComponent';
import CONST from '../../js/constants/constants';
import LoadingComponent from '../../components/LoadingComponent';

const RegisterScreen = (props) => {

    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [modelFlag, setModelFlag] = useState(true)
    //
    const signupSuccess = useSelector(state => state.authReducer.signupSuccess);
    const signupError = useSelector(state => state.authReducer.signupError)
    const regLoading = useSelector(state => state.authReducer.regLoading)
    const signupErrorFlag = useSelector(state => state.authReducer.signupErrorFlag)
    const dispatch = useDispatch();
    //
    useEffect(() => {
        dispatch(authActions.resetState())

        return () => {
            setEmail(null)
            setPassword(null)
            setFirstname(null)
            setLastname(null)
        }
    }, [])

    const onChangeInputs = (input, type) => {
        switch (type) {
            case "firstname":
                setFirstname(input)
                break;
            case "lastname":
                setLastname(input)
                break;
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
        dispatch(authActions.resetState())
        if (msg === "success") {
            props.navigation.navigate('Login')
        } else {
            props.navigation.push('Register')
        }
    }

    const onSubmit = () => {
        if(firstname===null || lastname ===null){
            Alert.alert("Ops","Enter Firstname and Lastname", [
                { text: "Ok", onPress: () => {}}
            ]);
            return true;
        }
        let userData = {
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            password: password
        }
        dispatch(authActions.auth(userData))
        setEmail(null)
        setPassword(null)
        setFirstname(null)
        setLastname(null)
        setModelFlag(true);
    }

    if (regLoading) {
        return (
            <LoadingComponent />
        )
    }else if (signupErrorFlag) {
        switch (signupError) {
            case CONST.ERRORCODE_USER_ALREADY_EXIST:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"green"}
                    title={"Ops !"}
                    subtitle={"Email is already present."}
                    message={"Kindly register with different email address."}
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
            case CONST.ERRORCODE_OPERATION_NOT_ALLOWED:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Error !"}
                    subtitle={"Server Error !"}
                    message={"Kindly bear with us we are working on it."}
                    onPress={() => handleModel("error")}
                />
            case CONST.ERRORCODE_WEAK_PASSWORD:
                return <ModalComponent
                    show={modelFlag}
                    titleColor={"red"}
                    title={"Ops !"}
                    subtitle={"Weak Password !"}
                    message={"Kindly choose strong password.(Min. 6 length includes Uppercase, Lowercase, Special Character & Number)"}
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
                <Image style={styles.image} source={require('../../assets/authImages/register.png')} />
            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.textHeadContainer}>
                    <Text style={styles.textHead}>Register</Text>
                    {windowHeight > 593 ? <View></View> : <Text style={styles.textScroll}>{"Scroll for more\noptions"}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={firstname}
                        placeholder={"Firstname"}
                        onChangeText={(input) => onChangeInputs(input, "firstname")}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={lastname}
                        placeholder={"Lastname"}
                        onChangeText={(input) => onChangeInputs(input, "lastname")}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={email}
                        placeholder={"Email"}
                        onChangeText={(input) => onChangeInputs(input, "email")}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInputComponent
                        value={password}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChangeText={(input) => onChangeInputs(input, "password")}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.submitButtonStyle}
                        activeOpacity={.5}
                        onPress={onSubmit}
                    >
                        <Text style={styles.submitTextStyle}> Register </Text>
                    </TouchableOpacity>
                    {
                        signupSuccess ?
                            <ModalComponent
                                show={modelFlag}
                                titleColor={"green"}
                                title={"Registration Successfull !"}
                                subtitle={"Aman welcomes you to the NOTES app."}
                                message={"Kindly Login and have fun with your notes."}
                                onPress={() => handleModel("success")}
                            /> : <View></View>
                    }
                </View>
                <View style={styles.goToRegister}>
                    <Text style={styles.registerLinkText}>Already have an account ..?</Text>
                    <TouchableOpacity
                        onPress={() => { props.navigation.navigate('Login') }}
                    >
                        <Text style={styles.registerLink}> Login</Text>
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
    )
}

const styles = StyleSheet.create({
    flashMessage: {
        position: 'absolute',
        backgroundColor: 'green',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        top: 0
    },
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    imageContainer: {
        width: "100%",
        height: windowHeight > 593 ? 200 : 150,
        borderBottomRightRadius: 90,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4
    },
    image: {
        width: "100%",
        height: windowHeight > 593 ? 200 : 140,
        borderBottomRightRadius: 90,
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
        fontSize: 12,
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
        flex: 1,
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

export default RegisterScreen