// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './js/store/index';
import AppLoading from 'expo-app-loading';
import FlashMessage from "react-native-flash-message";
import * as Font from 'expo-font';

const AppWraper = () => {
    const [fontLoaded, setFontLoaded] = useState(false)

    const fetchFonts = () => Font.loadAsync({
        'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
        'roboto-mono-regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    })

    if (!fontLoaded) {
        console.log('Loading start')
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        )
    } else {
        return (
            <Provider store={store}>
                <App />
                <FlashMessage position="top" />
            </Provider>
        )
    }
}

export default AppWraper;
