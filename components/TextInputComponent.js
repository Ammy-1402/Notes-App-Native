import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';

function TextInputComponent(props) {
    return (
        <View>
            <TextInput 
                value={props.value}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                style={{...styles.input, ...props.styles}}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#9999FF',
        height: 50,
        borderWidth: 1.5,
        borderRadius: 25,
        padding: 12
    }
})

export default TextInputComponent
