import React from 'react'
import { Text, TouchableOpacity, View, Modal, StyleSheet } from 'react-native'

function ModalComponent(props) {
    return (
        <Modal
            statusBarTranslucent={true}
            transparent={true}
            animationType="fade"
            visible={props.show}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.textContainer}>
                        <Text style={{...styles.title, color: props.titleColor}}>{props.title}</Text>
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                        <Text style={styles.message}>{props.message}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={props.onPress}
                        >
                            <Text style={styles.btn}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {
        backgroundColor: "white",
        padding: 14,
        margin: 32,
        borderRadius: 15,
        elevation: 9,
        shadowColor: "black",
        shadowOpacity: 0.50,
        shadowOffset: { width: 0, height: 3 },
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "open-sans-light",
        margin: 4
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "open-sans-light",
        margin: 4,
        fontWeight: 'bold',
        textAlign: "justify"
    },
    message: {
        fontSize: 14,
        fontFamily: "open-sans-light",
        margin: 4,
    },
    btnContainer: {
        marginTop: 24,
        alignItems: "flex-end"
    },
    openButton: {
        backgroundColor: "#5AA6F1",
        borderRadius: 10,
        padding: 10,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        fontSize: 14,
        color: "white",
    }
})

export default ModalComponent
