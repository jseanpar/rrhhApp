import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Text, Alert} from 'react-native'
import { NavigationActions } from 'react-navigation'

import API from '../../../utils/api'

class SendMail extends Component {

    state = { loadingButton: false,  userEmail: undefined } 

    validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          return false;
        }
        else {
          return true;
        }
      }

    handleSendMail = async () => {

        this.setState({ loadingButton: true })

        if ( ( typeof this.state.userEmail === 'undefined') || ( this.state.userEmail === '' ) ) {
            this.showMessage('Atención', 'Debe ingresar el email.')
            this.setState({ loadingButton: false })
        }
        else {
         const mailValidate = this.validateEmail(this.state.userEmail)

         if(mailValidate === false){
            this.showMessage('Atención', 'Debe ingresar un email válido.')
            this.setState({ loadingButton: false })
         }else{

            API.postSendMail(this.props.auth, this.state.userEmail, this.props.document,this.props.title, this.props.nameDoc).then((sendMail) => {
                if(sendMail.code == 202){
                    this.showMessage('Éxito', 'Se envío el documento a tu correo')
                }else{
                    this.showMessage('Atención', 'Ha ocurrido un error, intentelo más tarde')
                }
                this.setState({ loadingButton: false })
            })
         }
       } 
      }

    showMessage = ( p_title, p_message ) => {
        Alert.alert ( p_title, p_message, [ {text: 'OK', onPress: () => console.log ( 'OK Pressed' ) }, ], { cancelable: true } )
    }

    render(props) {
        return (
            <View style={styles.formContainer} >
                <View style={styles.inputWrapper} >
                    <TextInput onChangeText={(text) => { this.setState({ userEmail: text }) }} style={styles.input} placeholder="Ingrese Email" placeholderTextColor="black" underlineColorAndroid="transparent" />
                </View>
                <TouchableOpacity onPress = { this.handleSendMail } style={styles.button} >
                    <Text style={styles.buttonLabel} >
                        {this.state.loadingButton ? <View style={styles.loading} ><ActivityIndicator color="white" /></View> : <Text style={styles.title}>Enviar por Email</Text>}
                    </Text>
                </TouchableOpacity>
            </View>
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

function mapStateToProps(state) { return { auth: state.authReducer } }

export default connect(mapStateToProps)(SendMail)