import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from '../../../firebase/config'
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from '../../../components/LoadingComponent';
import NotesListComponent from '../../../components/NotesListComponent';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

const HomeScreen = (props) => {

    const [email, setEmail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notesArr, setNotesArr] = useState([])

    const getNotesData = (querySnapshot) => {
        setLoading(true)
        const notesArr = [];
        if (!querySnapshot) {
            setLoading(false)
        } else {
            querySnapshot.forEach((res) => {
                const { noteData, noteSubtitle, noteTitle, createdAt, updatedAt, email } = res.data()
                notesArr.push({
                    key: res.id,
                    noteTitle,
                    noteSubtitle,
                    noteData,
                    createdAt,
                    updatedAt,
                    email
                });
            });
            setNotesArr(notesArr)
            setLoading(false)
        }
    }

    useEffect(() => {

        let firebaseRef = null;
        AsyncStorage.getItem("email-id").then((value) => {
            let data = value.split("-")
            let email = data[0]
            setEmail(data[0])
            firebaseRef = firebase.firestore().collection('notes').doc(email).collection('notes_data').orderBy("updatedAt", "desc");
            firebaseRef.onSnapshot(getNotesData)
        }).catch((err) => {})
        return () => {
            firebaseRef.onSnapshot(getNotesData)()
        }
    }, [])

    const onDelete = (docId) => {
        Alert.alert(
            "Are you sure ?",
            "You want to delete your note ?",
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
                        confirmDelete(docId)
                    }
                }
            ]
            , { cancelable: false })
    }

    const confirmDelete = (docId) => {
        setLoading(true)
        firebase.firestore().collection('notes').doc(email).collection('notes_data').doc(docId).delete().then((res) => {
            setLoading(false)
        }).catch((err) => {})
    }

    if (loading) {
        return <LoadingComponent style={{ margin: 32 }} />
    } else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
                <View style={styles.container}>
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                                props.navigation.navigate('AddNoteScreen', {
                                    email: email
                                })
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Icon
                                    name="file"
                                    color="black"
                                    size={13}
                                    style={{ margin: 6 }}
                                />
                                <Text style={styles.addButtonText}>Create Note</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />
                    {
                        notesArr.length > 0 ?
                            <View>
                                <NotesListComponent
                                    {...props}
                                    onDelete={(docId) => onDelete(docId)}
                                    NotesArr={notesArr}
                                />
                            </View> :
                            <View style={styles.startContainer}>
                                <View style={styles.startCard}>
                                    <Text style={styles.startCardTextTitle}>
                                        Hey !! Aman welcomes you to the Notes App.
                                    </Text>
                                    <Text style={{ textAlign: "justify", marginTop: 10 }}>
                                        <Text style={styles.startCardTextBody}>
                                            Start creating you first note by clicking top right corner ..
                                        </Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#5b8bf4" }}>
                                            Create Note
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    line: {
        height: 2,
        backgroundColor: '#5b8bf4',
        marginTop: 2,
        opacity: 0.6
    },
    addButtonContainer: {
        margin: 10,
        alignItems: "flex-end"
    },
    addButtonText: {
        fontSize: 15
    },
    addButton: {
        borderRadius: 20,
        borderColor: "silver",
        borderWidth: 1,
        elevation: 5,
        backgroundColor: "#dedede",
        padding: 10
    },
    startContainer: {
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    startCard: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "80%",
        height: "80%",
        elevation: 8,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 },
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: "white"
    },
    startCardTextTitle: {
        fontSize: 18,
        textAlign: "justify",
        fontFamily: "roboto-regular"
    },
    startCardTextBody: {
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "roboto-regular"
    }
})

export default HomeScreen