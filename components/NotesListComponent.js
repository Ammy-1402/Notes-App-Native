import moment from 'moment'
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const NotesListComponent = (props) => {
    const renderListItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{ transition: "0.2s all" }}
            onPress={() => props.navigation.navigate("EditNoteScreen", {
                note: item
            })}
        >
            <View style={styles.card}>
                {
                    item.noteTitle === "" ?
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Title</Text>
                            <View style={styles.delBtnContainer}>
                                <Icon
                                    name="trash"
                                    size={20}
                                    style={{ color: "red", elevation: 8 }}
                                    onPress={() => props.onDelete(item.key)}
                                />
                            </View>
                        </View>
                        :
                        <View style={styles.titleContainer}>
                            {
                                item.noteTitle.length > 21 ?
                                    <Text style={styles.titleText}>
                                        {(item.noteTitle + "-" + item.key).slice(0, 20)} ...
                                    </Text>
                                    :
                                    <Text style={styles.titleText}>
                                        {item.noteTitle}
                                    </Text>
                            }
                            <View style={styles.delBtnContainer}>
                                <Icon
                                    name="trash"
                                    color="grey"
                                    size={20}
                                    style={{ color: "red", elevation: 8 }}
                                    onPress={() => props.onDelete(item.key)}
                                />
                            </View>
                        </View>
                }
                <View style={styles.line} />
                {
                    item.noteSubtitle === "" ?
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subTitleText}>
                                Subtitle
                            </Text>
                        </View> :
                        <View style={styles.subTitleContainer}>
                            <Text style={styles.subTitleText}>
                                {
                                    item.noteSubtitle
                                }
                            </Text>
                        </View>
                }
                {
                    item.noteData === "" ?
                        <View style={styles.noteDataContainer}>
                            <Text style={styles.noteDataText}>
                                Empty Note.
                            </Text>
                        </View>
                        :
                        <View style={styles.noteDataContainer}>
                            {
                                item.noteData.length > 250 ?
                                    <Text style={styles.noteDataText}>
                                        {(item.noteData).slice(0, 250)} ...
                                    </Text>
                                    :
                                    <Text style={styles.noteDataText}>
                                        {item.noteData}
                                    </Text>
                            }
                        </View>
                }
                <View style={styles.line} />
                {/* <View style={styles.pdfDownloadContainer}>
                    <TouchableOpacity
                        style={styles.pdfConatinerInner}
                        onPress={() => props.createPdf(item)}
                    >
                        <Icon
                            name="file-pdf-o"
                            color="red"
                            size={20}
                        />
                        <Text style={{ marginLeft: 5 }}>Download</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line} /> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                    <View>
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Created At :</Text>
                        <Text style={{ fontSize: 10 }}>
                            {moment(new Date(item.createdAt.toDate().toString())).format('MMM Do YYYY, h:mm a')}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, marginTop: 4 }}>Updated At :</Text>
                        <Text style={{ fontSize: 10 }}>
                            {moment(new Date(item.updatedAt.toDate().toString())).format('MMM Do YYYY, h:mm a')}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View >
            <FlatList
                keyboardShouldPersistTaps="handled"
                data={props.NotesArr}
                renderItem={renderListItem}
                style={styles.container}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 150 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
    },
    line: {
        height: 1.5,
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: '#e4e4e4',
    },
    card: {
        width: "90%",
        backgroundColor: "white",
        elevation: 8,
        marginLeft: 15,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 3 }
    },
    titleContainer: {
        marginBottom: 4,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleText: {
        fontFamily: "roboto-regular",
        fontSize: 17,
        fontWeight: "bold"
    },
    delBtnContainer: {
        padding: 6,
        paddingHorizontal: 7,
        borderRadius: 5,
        backgroundColor: "#ffc0c0",
        elevation: 8
    },
    subTitleContainer: {
        marginBottom: 4,
        padding: 2
    },
    subTitleText: {
        fontFamily: "roboto-regular",
        fontSize: 16
    },
    noteDataContainer: {
        marginBottom: 4,
        padding: 2,
        minHeight: 50
    },
    noteDataText: {
        fontFamily: "roboto-regular",
        fontSize: 12,
        textAlign: "justify"
    },
    pdfDownloadContainer: {
        marginVertical: 4,
        padding: 2,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    pdfConatinerInner: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#ebebeb",
        elevation: 8
    }
})

export default NotesListComponent
