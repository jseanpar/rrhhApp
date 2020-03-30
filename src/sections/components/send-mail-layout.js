import React from 'react'
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput} from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text, Badge, Icon } from 'native-base'

function SendMailLayout(props) {
    return (
        <View style={styles.formContainer} >
            <View style={styles.inputWrapper} >
                <TextInput onChangeText={(text) => { this.setState({ userName: text }) }} style={styles.input} placeholder="Ingrese Email" placeholderTextColor="black" underlineColorAndroid="transparent" />
            </View>
            <TouchableOpacity onPress={props.onPress} style={styles.button} >
                <Text style={styles.buttonLabel} >
                   {props.loading ? <View style={styles.loading} ><ActivityIndicator color="white" /></View> : <Text style={styles.title}>Enviar por Email</Text>} 
                </Text>
            </TouchableOpacity> 
        </View> 
    )
}

const styles = StyleSheet.create({
    message: {
        marginTop: 10,
    },
    container: {
        flex: 1,
    },
    formContainer: {
        /*flex: 1,*/
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    title: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#d6d9db',
        width: 300,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#000',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36a3f7',
        height: 40,
        width: 300,
        borderRadius: 20,
        zIndex: 100,
        fontSize: 20,
    },
    buttonLabel: {
        color: 'white',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loading: {
        width: 30,
        height: 10,
    },
});

export default SendMailLayout 