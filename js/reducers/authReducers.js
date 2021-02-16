import actionType from '../constants/actionType' 

const initialState = {
    token: null,
    loading: false,
    loginSuccess: false,
    loginError: false,
    loginErrorFlag: false,
    signupSuccess: false,
    signupError: null,
    signupErrorFlag: false,
    regLoading: false
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true,
        regLoading: true
    }
};
// ------------------- LOG IN REDUCERS START -----------------------
const authLogInSuccess = (state, action) => {
    return {
        ...state,
        token: action.payLoad,
        loginSuccess: true,
        loading: false,
        regLoading: false
    }
};
const authLogInFailed = (state, action) => {
    return {
        ...state,
        loginError: action.payLoad,
        loginErrorFlag: true,
        loading: false,
        regLoading: false
    }
};
// ------------------- LOG IN REDUCERS END -----------------------


// ------------------- SIGNUP REDUCERS START -----------------------
const authSignUpSuccess = (state, action) => {
    return {
        ...state,
        signupSuccess: true,
        loading: false,
        regLoading: false
    }
};
const authSignUpFailed = (state, action) => {
    return {
        ...state,
        signupError: action.payLoad,
        signupErrorFlag: true,
        loading: false,
        regLoading: false
    }
};
// ------------------- SIGNUP REDUCERS END -----------------------

export const resetState = () => {
    return { 
        initialState
    }
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionType.AUTH_START:
            return authStart(state, action);
        case actionType.AUTH_LOGIN_SUCCESS: 
            return authLogInSuccess(state, action);
        case actionType.AUTH_LOGIN_FAILED:
            return authLogInFailed(state, action);
        case actionType.AUTH_SIGNUP_SUCCESS:
            return authSignUpSuccess(state, action);
        case actionType.AUTH_SIGNUP_FAILED:
            return authSignUpFailed(state, action);
        case actionType.RESET:
            return resetState()
        default:
            return state;
    }
}

export default reducer;