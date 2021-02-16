import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const AboutScreen = (props) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.title}>
                    <Text style={{ fontSize: 18 }}>Notes App</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.subtitle}>
                    <Text style={{ fontSize: 16 }}>This app is created by
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}> Aman Sharma.</Text>
                    </Text>
                </View>
                <View style={styles.body}>
                    <Text style={{ fontSize: 16, textAlign: "justify" }}>
                        This app is for "practice purpose only", but you can create your own notes in secure and easy manner.
                        </Text>
                    <Text style={{ marginTop: 8, fontSize: 16, textAlign: "justify" }}>
                        Here you will be able to Create, Update OR Delete your notes, whenever you want and can access your Notes wherever you are as it is backed by
                            <Text
                            style={{ fontSize: 16, fontWeight: "bold", color: "#307ecc" }}
                        > Google's Firebase</Text> and your Notes data is secured at " Firebase Cloudstore ".
                        </Text>
                    <Text style={{ marginTop: 8, fontSize: 16, textAlign: "justify" }}>
                        The other thing you can do here is you can change your password from the profile section where you can see your details.
                        </Text>
                    <Text style={{ marginTop: 8, fontSize: 16, textAlign: "justify" }}>
                        Thanks for using this App. Enjoy !!
                        </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 20,
        alignItems: "center"
    },
    innerContainer: {
        borderColor: "grey",
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 20,
        elevation: 6,
        width: "90%",
    },
    title: {
        alignItems: "center",
    },
    subtitle: {
        alignItems: "center",
        marginVertical: 8,
    },
    body: {
        padding: 10
    },
    line: {
        height: 2,
        marginTop: 8,
        backgroundColor: '#e4e4e4',
    }
})

export default AboutScreen