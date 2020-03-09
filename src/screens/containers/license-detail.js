import React, { Component } from 'react';
import { SafeAreaView, BackHandler, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, ListItem, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf'

import API from '../../../utils/api'
import Header  from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'

class LicenseDetail extends Component {

    state = { loading: true }

    constructor ( props ) {
        super ( props )
        this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount () {

        /*
        await API.getAuth()
        .then( ( auth ) => {
            API.getDocumentByCode ( auth, this.props.selectedDocument.docu_cod_clave )
            .then( ( document ) => {
                this.props.dispatch ( { type: 'SET_DOCUMENT', payload: { document } } )
                this.setState ( { loading: false } )
            } )
        })

        */

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
        console.log(this.props)
        const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true}
        // const source = {uri: `data:application/pdf;base64,${ this.props.document }`}
        return (
            <SafeAreaView style = { { flex:1 } } >
                <Container>
                    <Header navigation = { this.props.navigation } title = 'Documento' >
                        <HeaderBackButton onPress = { () => { this.props.navigation.goBack() } } />
                    </Header>
                    <Content padder>    
                        <ListItem>
                            <Body style = { { justifyContent: 'center', alignItems: 'center' } } >
                                <Text style = { { fontSize: 12 } }></Text>
                            </Body>
                        </ListItem>
                        <Pdf source={source} onLoadComplete={(numberOfPages,filePath)=> { console.log(`number of pages: ${numberOfPages}`) }}
                            onPageChanged={(page,numberOfPages)=>{ console.log(`current page: ${page}`) }}
                            onError={(error)=> { console.log(error) }}
                            onPressLink={(uri)=> { console.log(`Link presse: ${uri}`) }}
                            style={styles.pdf}/>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

function mapStateToProps ( state ) { return { selectedLicense: state.employeReducer.selectedLicense} }

export default connect ( mapStateToProps ) ( LicenseDetail )