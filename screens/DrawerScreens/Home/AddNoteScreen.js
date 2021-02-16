import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import NoteTextInputComponent from '../../../components/NoteTextInputComponent'
import firebase from '../../../firebase/config'
import LoadingComponent from '../../../components/LoadingComponent'

const AddNoteScreen = (props) => {

    const [email, setEmail] = useState(null)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteSubtitle, setNoteSubtitle] = useState("")
    const [noteData, setNoteData] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setEmail(props.route.params.email)
        return () => {
            console.log('AddNoteScreen cleanup')
        }
    }, [])

    const onChangeHandle = (input, type) => {
        switch (type) {
            case "title":
                setNoteTitle(input)
                break;
            case "subtitle":
                setNoteSubtitle(input)
                break;
            case "notedata":
                setNoteData(input)
                break;
            default:
                break;
        }
    }
    const addNote = async () => {
        setLoading(true)
        firebase.firestore().collection('notes').doc(email).collection('notes_data').add({
            noteTitle: noteTitle,
            noteSubtitle: noteSubtitle,
            noteData: noteData,
            createdAt: new Date(),
            updatedAt: new Date(),
            email: email
        }).then((r) => {
            console.log("Adding Data")
            setNoteTitle("")
            setNoteSubtitle("")
            setNoteData("")
            setLoading(false)
        }).catch((err) => {
            console.log('about error: ', err)
        })
    }

    if (loading) {
        return <LoadingComponent style={{ margin: 32 }}/>
    } else {
        return (
            <ScrollView keyboardShouldPersistTaps='handled' style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ margin: 8 }}>
                        <Button
                            title="Create"
                            onPress={addNote}
                        />
                    </View>
                    <View style={styles.titleInputContainer}>
                        <View style={{ marginVertical: 8 }}>
                            <Text style={styles.headInputText}>Title</Text>
                        </View>
                        <NoteTextInputComponent
                            editable
                            style={{ alignItem: "center" }}
                            onChangeText={(input) => onChangeHandle(input, "title")}
                        />
                    </View>
                    <View style={styles.subTitleInputContainer}>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={styles.headInputText}>Subtitle</Text>
                        </View>
                        <NoteTextInputComponent
                            editable
                            onChangeText={(input) => onChangeHandle(input, "subtitle")}
                        />
                    </View>
                    <View style={styles.dataInputContainer}>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={styles.headInputText}>Note</Text>
                        </View>
                        <NoteTextInputComponent
                            multiline
                            editable
                            maxHeight={500}
                            numberOfLines={10}
                            onChangeText={(input) => onChangeHandle(input, "notedata")}
                            styles={{ textAlignVertical: 'top' }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        padding: 10,
    },
    titleInputContainer: {
        width: "100%",
        marginVertical: 10,
        paddingHorizontal: 8
    },
    subTitleInputContainer: {
        width: "100%",
        marginVertical: 10,
        paddingHorizontal: 8
    },
    dataInputContainer: {
        width: "100%",
        marginVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 30
    },
    headInputText: {
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default AddNoteScreen
