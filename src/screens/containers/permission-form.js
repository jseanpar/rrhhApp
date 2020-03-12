import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Alert, StatusBar, AsyncStorage } from 'react-native';
import { DatePicker, Form, Item, Picker, Icon } from 'native-base';
import { connect } from 'react-redux';
import Header from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import API from '../../../utils/api';

class PermissionForm extends Component {

    state = {
        loading: true,
        FechaIni: undefined,
        FechaFin: undefined,
        TipoPerm: undefined,
        Dias: undefined,
        Obs: undefined,
        selected2: undefined, 
    }

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(), chosenDateFin: new Date(), loading: true,
        };

        this.setDate = this.setDate.bind(this);
        this.setDateFin = this.setDateFin.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    setDateFin(newDate) {
        this.setState({ chosenDateFin: newDate });
    }

    updatePermission = permiso => {
        this.setState({ permiso: permiso });
    };

    pickerChange(tipopermiso) {
        this.setState({ tipopermiso: tipopermiso });
    }

    fechaFormat(fecha) {

        let day = fecha.getDate()
        let month = fecha.getMonth() + 1
        let year = fecha.getFullYear()

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        var fechaFormat = day + '/' + month + '/' + year;

        return fechaFormat
    }

    componentDidMount() {
        API.getContractData(this.props.auth).then((response) => {

            if (response.http_status) {

                this.props.dispatch({
                    type: 'REMOVE_AUTH',
                })
                this.props.navigation.navigate('Loading');
            } else {
                var sector = response[0].CONT_DOM_SECTOR
                var tipo_ley = response[0].CONT_DOM_TIPO_LEY
                var tipo_contrato = response[0].CONT_DOM_TIPO_CONTRATO
                API.getTypePermissionData(this.props.auth, sector, tipo_ley, tipo_contrato).then((typepermission) => {
                    this.props.dispatch({ type: 'SET_TYPE_PERMISSION_LIST', payload: { typepermission } })
                    this.setState({ loading: false })
                })
            }
        })
    }

    handleLogin = async () => {

        var fini = this.fechaFormat(this.state.chosenDate);
        var ffin = this.fechaFormat(this.state.chosenDateFin);

        if ((typeof this.state.tipopermiso === 'undefined') || (this.state.tipopermiso === '') || (typeof this.state.Dias === 'undefined') || (this.state.Dias === '')) {
            this.setState({ loading: false })
            this.showMessage('Atención', 'Debe llenar todos los campos.')
        } else {
            API.getContractData(this.props.auth).then((response) => {
                var contrato = response[0].CONT_SEC
                API.postPermissionData(this.props.auth, this.state, fini, ffin, contrato).then((response) => {
                    this.props.navigation.navigate('Dashboard')
                })
            })
        }
    }

    showMessage = (p_title, p_message) => {
        Alert.alert(p_title, p_message, [{ text: 'OK', onPress: () => console.log('OK Pressed') },], { cancelable: true })
    }

    static navigationOptions = () => { return { header: null } }

    render() {
        console.log(this.state.loading)
        return (
           <SafeAreaView style={styles.container} >
                 <StatusBar barStyle="light-content" backgroundColor="#0A74BC" />
                <Header navigation={this.props.navigation} title='Agregar Permiso' >
                    <HeaderBackButton onPress={() => { this.props.navigation.goBack() }} />
                </Header>
                { this.state.loading ? 
                            <ActivityIndicator color = "#0098D0" size = "large" style = { { flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 } } />
                        : 
                            (
                <View style={styles.formContainer} >
                    <View style={styles.logoContainer} >
                        <Text style={styles.title} >RRHH App</Text>
                    </View>
                    <View style={styles.inputWrapper} >
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            locale={"es"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Seleccione fecha inicio"
                            textStyle={{
                                backgroundColor: '#d6d9db', width: 300,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 45,
                                borderRadius: 20,
                                color: '#000'
                            }}
                            placeHolderTextStyle={{
                                backgroundColor: '#d6d9db', width: 300,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 45,
                                borderRadius: 20,
                                color: '#000'
                            }}
                            onDateChange={this.setDate}
                        />
                    </View>
                    <View style={styles.inputWrapper} >
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            locale={"es"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Seleccione fecha fin"
                            textStyle={{
                                backgroundColor: '#d6d9db', width: 300,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 45,
                                borderRadius: 20,
                                color: '#000'
                            }}
                            placeHolderTextStyle={{
                                backgroundColor: '#d6d9db', width: 300,
                                height: 40,
                                marginHorizontal: 20,
                                paddingLeft: 45,
                                borderRadius: 20,
                                color: '#000'
                            }}
                            onDateChange={this.setDateFin}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={this.state.tipopermiso}
                                style={{ height: 20, width: 250 }}
                                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemValue)}>
                                <Picker.Item label="Seleccione Permiso" value="" />
                                {
                                    this.props.typepermission.map((v) => {
                                        return <Picker.Item label={v.GLS_TIPO_PERMISO} value={v.TIPO_PERMISO} key={v.TIPO_PERMISO} />
                                    })
                                }
                            </Picker> 
                        </View>
                            </View>
                    <View style={styles.inputWrapper} >
                        <TextInput onChangeText={(text) => { this.setState({ Dias: text }) }} style={styles.input} placeholder="Cantidad de Días" placeholderTextColor="black" keyboardType='number-pad' />
                    </View>
                    <View style={styles.inputWrapper} >
                        <TextInput onChangeText={(text) => { this.setState({ Obs: text }) }} style={styles.input} placeholder="Observación" placeholderTextColor="black" />
                    </View>
                    <TouchableOpacity onPress={this.handleLogin} style={styles.button} >
                        <Text style={styles.buttonLabel} >
                            {this.state.loading ? <View style={styles.loading} ><ActivityIndicator color="white" /></View> : <Text>Ingresar Permiso</Text>}
                        </Text>
                    </TouchableOpacity>
                 </View> 
                 ) 
                }  
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
    logoContainer: {
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

function mapStateToProps(state) { return { auth: state.authReducer, typepermission: state.employeReducer.typepermission } }

export default connect(mapStateToProps)(PermissionForm) 