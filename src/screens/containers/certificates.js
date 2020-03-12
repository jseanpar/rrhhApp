import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet,BackHandler, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Container, Content, Icon, Subtitle } from 'native-base'


import API from '../../../utils/api'
import Header  from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'

class Certificates extends Component {  

    viewModule = ( screen ) => { this.props.navigation.navigate ( screen ) }

    constructor ( props ) {
        super ( props )
        this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )
    }

    static navigationOptions = () => { return { header: null } }    

    componentDidMount () {
        BackHandler.addEventListener ( 'hardwareBackPress', this.handleBackButtonClick )
    }

    componentWillUnmount () {
        BackHandler.removeEventListener ( 'hardwareBackPress', this.handleBackButtonClick ) 
    }
    
    handleBackButtonClick () {
        this.props.navigation.goBack ( null )
        return true
    }

    render() {
        return (
            <SafeAreaView style = { { flex:1 } } >
                <Container>
                <Header navigation = { this.props.navigation } title = 'Certificados' >
                        <HeaderBackButton onPress = { () => { this.props.navigation.goBack() } } />
                    </Header>
                    <Content padder>
                        <View style = { styles.containerFirst } >
                            <TouchableOpacity  style = { styles.btn_anotaciones } onPress = { () => { this.viewModule ( 'HolidayPdf' ) } } >
                                <Icon name="md-document" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Vacaciones</Subtitle> 
                            </TouchableOpacity > 
                            <TouchableOpacity style = { styles.btn_anotaciones } onPress = { () => { this.viewModule ( 'AntiquePdf' ) } } >
                                <Icon name="md-document" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Antiguedad</Subtitle>
                            </TouchableOpacity>
                        </View>
                        <View style = { styles.container } >
                            <TouchableOpacity style = { styles.btn_anotaciones } onPress = { () => { this.viewModule ( 'ForeignPdf' ) } } >
                                <Icon name="md-document" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Extranjero</Subtitle>
                            </TouchableOpacity>
                            <TouchableOpacity style = { styles.btn_alum_curso } onPress = { () => { this.viewModule ( 'InternshipPdf' ) } } >
                                <Icon name="md-document" style = { { fontSize: 40, color: '#fff' } } />
                                <Subtitle>Pasantia</Subtitle>
                            </TouchableOpacity>
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

export default connect ( mapStateToProps ) ( Certificates )