import React from 'react'
import { Modal, View, ActivityIndicator, Text } from 'react-native'

const ModalActivityIndicator = (props) => {
    const {
        show = false,
        color = "#5b8bf4",
        backgroundColor = "white",
        dimLights = 0.5,
    } = props;
    return (
        <Modal transparent={true}
            animationType="fade"
            visible={show}
            onRequestClose={props.onRequestClose}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        padding: 13,
                        backgroundColor: `${backgroundColor}`,
                        borderRadius: 13
                    }}
                >
                    <ActivityIndicator animating={show} color={color} size="large" />
                    <Text style={{ color: 'black' }}>{props.loadingMessage}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default ModalActivityIndicator;
