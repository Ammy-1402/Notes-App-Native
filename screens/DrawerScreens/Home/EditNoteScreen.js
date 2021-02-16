import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import LoadingComponent from '../../../components/LoadingComponent'
import NoteTextInputComponent from '../../../components/NoteTextInputComponent'
import firebase from '../../../firebase/config'

const EditeNoteScreen = (props) => {

    const [currentNote, setCurrentNote] = useState([])
    const [noteTitle, setNoteTitle] = useState("")
    const [noteSubtitle, setNoteSubtitle] = useState("")
    const [noteData, setNoteData] = useState("")
    const [loading, setLoading] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        setCurrentNote(props.route.params.note)
        setNoteTitle(props.route.params.note.noteTitle)
        setNoteSubtitle(props.route.params.note.noteSubtitle)
        setNoteData(props.route.params.note.noteData)
        return () => { 
            setLoading(false)
        }
    }, [])

    const editNote = () => {
        Alert.alert(
            "Confirm save changes ?",
            "",
            [
                {
                    text: 'No',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        confirmChange(currentNote.key)
                    }
                }
            ]
            , { cancelable: false })
    }

    const confirmChange = (docId) => {
        setLoading(true)
        let updateNoteData = {
            noteTitle: noteTitle,
            noteSubtitle: noteSubtitle,
            noteData: noteData,
            updatedAt: new Date(),
            email: currentNote.email
        }
        firebase.firestore().collection('notes').doc(currentNote.email).collection('notes_data').doc(docId).update(updateNoteData).then((res) => {
            setSaveSuccess(true)
            setLoading(false)
        }).catch((err) => {})
    }

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

    if (loading) {
        return <LoadingComponent style={{ margin: 32 }}/>
    }else {
        return (
            <ScrollView keyboardShouldPersistTaps='handled' style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ margin: 8 }}>
                        <Button
                            title="Save"
                            onPress={editNote}
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
                            value={noteTitle}
                        />
                    </View>
                    <View style={styles.subTitleInputContainer}>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={styles.headInputText}>Subtitle</Text>
                        </View>
                        <NoteTextInputComponent
                            editable
                            onChangeText={(input) => onChangeHandle(input, "subtitle")}
                            value={noteSubtitle}
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
                            styles={{
                                textAlignVertical: 'top',
                            }}
                            value={noteData}
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

export default EditeNoteScreen