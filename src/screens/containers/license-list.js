import React, { Component } from 'react';
import { SafeAreaView, BackHandler, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import API from '../../../utils/api'
import Header  from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import Empty from '../../sections/components/empty'
import License from '../../sections/containers/license'

class LicenseList extends Component {

    state = { loading: true }

    constructor ( props ) {
        super ( props )
        this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount () {

        await API.getLicenceData(this.props.auth).then( ( licenseList ) => {
            if (licenseList.http_status) {
                this.props.dispatch({
                    type: 'REMOVE_AUTH',
                })
                this.props.navigation.navigate('Loading');
            } else {
            this.props.dispatch ( { type: 'SET_LICENSE_LIST', payload: { licenseList } } )
            this.setState ( { loading: false } )
            }
        } ) 
        
        BackHandler.addEventListener ( 'hardwareBackPress', this.handleBackButtonClick )
       
    }

    componentWillUnmount () { 
        BackHandler.removeEventListener ( 'hardwareBackPress', this.handleBackButtonClick ) 
    }

    handleBackButtonClick () {
        this.props.navigation.goBack ( null )
        return true
    }
    
    keyExtractor = item => item.LIME_SEC.toString ()
    renderEmpty = () => <Empty text = "No se encontraron registros" />

    documentPress = ( item ) => { 
        this.props.dispatch ( { type: 'SET_SELECTED_LICENSE', payload: { selectedLicense: item } } )
        this.props.dispatch ( NavigationActions.navigate ( { routeName: 'LicenseDetails' } ) )
    }

    renderItem = ( { item } ) => { 
        if(item.DESC_DOM_ESTADO_LICENCIA == 'AUTORIZADA') {
            return (
                <License { ...item } onPress = { () => { this.documentPress ( item ) } } />   
            )
        }else{
            return (
                <License { ...item }  />   
            )
        }
    
    } 
     
    render() {
        return (
            <SafeAreaView style = { { flex:1 } } >
                <Container>
                    <Header navigation = { this.props.navigation } title = 'Licencias' >
                        <HeaderBackButton onPress = { () => { this.props.navigation.goBack() } } />
                    </Header>
                    <Content padder> 
                        { this.state.loading ? 
                            <ActivityIndicator color = "#0098D0" size = "large" style = {{flex: 1, justifyContent: 'center', alignItems: 'center', height: 200}} />
                        : ( 
                            <FlatList keyExtractor = { this.keyExtractor } data = { this.props.employe.licenseList } ListEmptyComponent = { this.renderEmpty } 
                                renderItem = { this.renderItem } /> )  
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

function mapStateToProps ( state ) { return { auth: state.authReducer, employe: state.employeReducer} } 

export default connect ( mapStateToProps ) ( LicenseList )