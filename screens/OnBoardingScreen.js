import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = (props) => {
    return (
        <Onboarding
            onSkip={() => { props.navigation.replace("Auth") }}
            onDone={() => { props.navigation.navigate("Auth") }}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.images} source={require('../assets/onboardingImages/img1.png')} />,
                    title: 'Make-Notes',
                    subtitle: 'Design you notes in your way',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.images} source={require('../assets/onboardingImages/img2.png')} />,
                    title: 'Download or Share',
                    subtitle: 'You can download or share your notes',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.images} source={require('../assets/onboardingImages/img3.png')} />,
                    title: 'Save paper and go DIGITAL',
                    subtitle: 'Save papers and use your phone for your important notes that you will carry wherever you go.So, lets create your first NOTE',
                }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    images: {
        width: 300,
        height: 200
    }
})

export default OnBoardingScreen;