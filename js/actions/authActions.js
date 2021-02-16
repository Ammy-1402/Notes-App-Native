import actionType from '../constants/actionType';
import firebase from '../../firebase/config';
import CONST from '../constants/constants';
import AsyncStorage from '@react-native-community/async-storage';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}
// ------------------- LOG IN ACTIONS START -----------------------
export const authLogInSuccess = (authData) => {
    return {
        type: actionType.AUTH_LOGIN_SUCCESS,
        payLoad: authData
    }
}
export const authLogInFailed = (error) => {
    return {
        type: actionType.AUTH_LOGIN_FAILED,
        payLoad: error
    }
}
// ------------------- LOG IN ACTIONS END -------------------------

// ------------------- SIGNUP ACTIONS START -----------------------
export const authSignUpSuccess = (authData) => {
    return {
        type: actionType.AUTH_SIGNUP_SUCCESS,
        payLoad: authData
    }
}
export const authSignUpFailed = (error) => {
    return {
        type: actionType.AUTH_SIGNUP_FAILED,
        payLoad: error
    }
}
// ------------------- SIGNUP ACTIONS END -------------------------

export const resetState = () => {
    return {
        type: actionType.RESET,
    }
}

export const auth = (authData) => {
    return dispatch => {
        dispatch(authStart());
        let authDataLength = Object.keys(authData).length;
        let firestoreDbRef = firebase.firestore().collection('users');
        //If authDataLength === 2 (For Login (email & password))
        //If authDataLength === 4 (For Signup (firstname, lastname, email & password))
        if (authDataLength === CONST.FOR_LOGIN) {
            let flag = true;
            // For Login
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                .then((result) => {
                    // Signed in 
                    AsyncStorage.setItem("oldUser", `${flag}`)
                    AsyncStorage.setItem("isLoggedIn", `${flag}`)
                    AsyncStorage.setItem("email-id", `${authData.email}` + "-" + `${result.user.uid}`).then()
                    dispatch(authLogInSuccess("Login Success, Token"));
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    switch (errorCode) {
                        case CONST.ERRORCODE_WRONG_PASSWORD:
                            dispatch(authLogInFailed(CONST.ERRORCODE_WRONG_PASSWORD))
                            break;
                        case CONST.ERRORCODE_USER_NOT_FOUND:
                            dispatch(authLogInFailed(CONST.ERRORCODE_USER_NOT_FOUND))
                            break;
                        case CONST.ERRORCODE_USER_DISABLED:
                            dispatch(authLogInFailed(CONST.ERRORCODE_USER_DISABLED))
                            break;
                        case CONST.ERRORCODE_INVALID_EMAIL:
                            dispatch(authLogInFailed(CONST.ERRORCODE_INVALID_EMAIL))
                            break;
                        default:
                            dispatch(authLogInFailed("Error: authLoginFailed"))
                            break;
                    }
                });
        } else {
            // For Signup
            let currentDate = new Date();
            firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                .then((result) => {
                    // Signed in 
                    let registerData = {
                        createdAt: currentDate,
                        uid: result.user.uid,
                        firstname: authData.firstname,
                        lastname: authData.lastname,
                        email: authData.email,
                        password: authData.password,
                        updatedAt: currentDate

                    }
                    firestoreDbRef.doc(`${authData.email}`).set(registerData)
                        .then(() => {
                            dispatch(authSignUpSuccess("Signup Success"));
                        }).catch(() => {
                            dispatch(authSignUpFailed(CONST.ERRORCODE_OPERATION_NOT_ALLOWED))
                        });

                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    switch (errorCode) {
                        case CONST.ERRORCODE_USER_ALREADY_EXIST:
                            dispatch(authSignUpFailed(CONST.ERRORCODE_USER_ALREADY_EXIST))
                            break;
                        case CONST.ERRORCODE_INVALID_EMAIL:
                            dispatch(authSignUpFailed(CONST.ERRORCODE_INVALID_EMAIL))
                            break;
                        case CONST.ERRORCODE_OPERATION_NOT_ALLOWED:
                            dispatch(authSignUpFailed(CONST.ERRORCODE_OPERATION_NOT_ALLOWED))
                            break;
                        case CONST.ERRORCODE_WEAK_PASSWORD:
                            dispatch(authSignUpFailed(CONST.ERRORCODE_WEAK_PASSWORD))
                            break;
                        default:
                            dispatch(authSignUpFailed("Error: authSignupFailed"))
                            break;
                    }
                });
        }
    }
}