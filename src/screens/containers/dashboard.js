import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Container, Content, Icon, Subtitle } from 'native-base'


import API from '../../../utils/api'
import Header from '../../sections/containers/header';

class Dashboard extends Component {  

    viewModule = ( screen ) => { this.props.navigation.navigate ( screen ) }

    static navigationOptions = () => { return { header: null } }    

    render() {
        return (
            <SafeAreaView style = { { flex:1 } } >
                <Container>
                    <Header title = 'Inicio' navigation = { this.props.navigation } /> 
                    <Content padder>
                        <View style = { styles.containerFirst } >
                            <TouchableOpacity  style = { styles.btn_notas } onPress = { () => { this.viewModule ( 'EmployeList' ) } } >
                                <Icon name="md-bookmarks" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Antecedentes Personales</Subtitle>
                            </TouchableOpacity > 
                            <TouchableOpacity style = { styles.btn_asistencia } onPress = { () => { this.viewModule ( 'PermissionList' ) } } >
                                <Icon name="md-calendar" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Permisos</Subtitle>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.container } >
                            <TouchableOpacity style = { styles.btn_anotaciones } onPress = { () => { this.viewModule ( 'HolidayList' ) } } >
                                <Icon name="ios-list-box" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Vacaciones</Subtitle>
                            </TouchableOpacity>
                            <TouchableOpacity style = { styles.btn_alum_curso } onPress = { () => { this.viewModule ( 'SettlementList' ) } } >
                                <Icon name="md-archive" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Liquidaciones</Subtitle>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.container } >
                            <TouchableOpacity  style = { styles.btn_nursing } onPress = { () => { this.viewModule ( 'FamilyList' ) } } >
                                <Icon name="ios-people" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Familia</Subtitle>
                            </TouchableOpacity >
                            <TouchableOpacity style = { styles.btn_documents } onPress = { () => { this.viewModule ( 'DocumentList' ) } } >
                                <Icon name="md-document" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Certificados</Subtitle>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.container } >
                            <TouchableOpacity  style = { styles.btn_anotaciones } onPress = { () => { this.viewModule ( 'LicenseList' ) } } >
                                <Icon name="md-medkit" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Licencias</Subtitle>
                            </TouchableOpacity >
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>   
        )
    }
}

const styles = StyleSheet.create ( {
    letra14Btn: {
        color: 'white',
        fontSize: 14,
    },
    containerFirst: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_notas: {
        backgroundColor: '#87c639', 
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2, 
        marginLeft: 8,
        marginRight: 4,
        marginVertical: 4, 
    },
    btn_asistencia: { 
        backgroundColor: '#87c639',  
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 4,
        marginRight: 8,
        marginVertical: 4,
    },
    btn_anotaciones: {
        backgroundColor: '#00b1f2',
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 8,
        marginRight: 4,
        marginVertical: 4, 
    },
    btn_alum_curso: {
        backgroundColor: '#00b1f2',
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 4,
        marginRight: 8,
        marginVertical: 4,
    },
    btn_nursing: {
        backgroundColor: '#ffa838',
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 8,
        marginRight: 4,
        marginVertical: 4, 
    },
    btn_documents: {
        backgroundColor: '#ffa838', 
        width: 140,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 4,
        marginRight: 8,
        marginVertical: 4,
    }
})

function mapStateToProps ( state ) { return {auth: state.authReducer } }

export default connect ( mapStateToProps ) ( Dashboard )