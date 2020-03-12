import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal'

import API from '../../../utils/api';

class ChangePassword extends Component {
    
    state = {
        loading: false,
        passwordAnt : undefined,
        password1: undefined,
        password2: undefined,
    }

    constructor ( props ) {
        super ( props )
        //this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )  
    }

    handleChangePassword = async () => {
        this.setState ( { loading: true } )
        if ( ( typeof this.state.password1 === 'undefined') || ( this.state.password1 === '' ) ) {
            this.setState ( { loading: false } )
            this.showMessage('Atención', 'Debe ingresar la contraseña')
        }
        else {
            if ( ( typeof this.state.password2 === 'undefined' ) || ( this.state.password === '' ) ) {
                this.setState ( { loading: false } )
                this.showMessage('Atención', 'Debe ingresar la contraseña nuevamente.')
            }
            else{
                if(this.state.password1 !== this.state.password2){
                    this.setState ( { loading: false } )
                    this.showMessage('Atención', 'las contraseñas no son iguales.')
                }else{ 
                        API.postChangePassword (this.props.auth,this.state.passwordAnt,this.state.password1)
                        .then( ( valor ) => {
                        console.log(valor);
                            if(valor.http_status){
                                this.showMessage('Atención', valor.error_message)
                            }else{
                                this.setState ( { loading: false } )
                                this.props.navigation.navigate ( 'Login' )
                            }
                        } )
                    
                    this.setState ( { loading: false } )
                }
            }
        }
    }

    showMessage = ( p_title, p_message ) => {
        Alert.alert ( p_title, p_message, [ {text: 'OK', onPress: () => console.log ( 'OK Pressed' ) }, ], { cancelable: true } )
    }

    render () {

        console.log(this.props)
        return (
            <SafeAreaView style = { styles.container } >
                <StatusBar barStyle="light-content" backgroundColor="#0A74BC" />  
                <ImageBackground source = { require ('../../../assets/15.jpg') } style = { styles.imagebackground } >
                    <View style = { styles.formContainer } >
                        <View style = { styles.logoContainer } >
                            <Image source = { require ('../../../assets/234.png') } style = { styles.logo } />
                            <Text style = { styles.title } >Cambiar password</Text>
                        </View>
                        <View style = { styles.inputWrapper } >
                            <Image source = { require ('../../../assets/password.png') } style = { styles.inlineImg } />
                            <TextInput onChangeText = { ( text ) => { this.setState ( { passwordAnt: text } ) } } style = { styles.input } placeholder = "Ingrese Contraseña Actual" placeholderTextColor = "white" secureTextEntry = { true } />
                        </View>
                        <View style = { styles.inputWrapper } >
                            <Image source = { require ('../../../assets/password.png') } style = { styles.inlineImg } />
                            <TextInput onChangeText = { ( text ) => { this.setState ( { password1: text } ) } } style = { styles.input } placeholder = "Ingrese Nueva Contraseña" placeholderTextColor = "white" secureTextEntry = { true } />
                        </View>
                        <View style = { styles.inputWrapper } >
                            <Image source = { require ('../../../assets/password.png') } style = { styles.inlineImg } />
                            <TextInput onChangeText = { ( text ) => { this.setState ( { password2: text } ) } } style = { styles.input } placeholder = "Repita Nueva Contraseña" placeholderTextColor = "white" secureTextEntry = { true } />
                        </View>
                        <TouchableOpacity onPress = { this.handleChangePassword } style = { styles.button } >
                            <Text style = { styles.buttonLabel } >
                                { this.state.loading ? <View style = { styles.loading } ><ActivityIndicator color = "white" /></View> : <Text>Cambiar Contraseña</Text> }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = { styles.footerContainer } >
                        <Text style = { styles.version } >Versión 1.0.0 - Desarrollado por </Text>
                        <Image source = { require ('../../../assets/pad-logo.png') } style = { styles.logoBy } />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        marginTop: 10, 
    },
    container: {
        flex: 1,
    },
    logoContainer : {
        //paddingBottom: 35,
        alignItems: 'center',
    },
    imagebackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20%',
        
    },
    logo: {
        width: 100,
        height: 90,
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputWrapper: {
        marginBottom: 20, 
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: 250,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36a3f7',
        height: 40,
        width: 250,
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
        height:10,
    },
    footerContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 3,
        alignItems: 'center',
    },
    version: {
        color: 'white'
    },
    logoBy: {
        width: 100,
        height: 20,
        resizeMode: 'cover',
    }
})

function mapStateToProps ( state ) { return { user: state.userReducer, auth: state.authReducer } }

export default connect ( mapStateToProps ) ( ChangePassword ) 