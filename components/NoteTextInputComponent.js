import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';

function NoteTextInputComponent(props) {
    return (
        <View>
            <TextInput
                {...props}
                value={props.value}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                style={{ ...styles.input, ...props.styles }}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        fontSize: 18
    }
})

export default NoteTextInputComponent
