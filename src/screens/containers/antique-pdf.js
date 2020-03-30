import React, { Component } from 'react';
import { SafeAreaView, BackHandler, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text, View } from 'native-base';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf'

import API from '../../../utils/api'
import Header  from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import SendMail from '../../sections/containers/send-mail';

class AntiquePdf extends Component {

    state = { loading: true }

    constructor ( props ) {
        super ( props )
        this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount () {

       await API.getAntiquePdf(this.props.auth).then((antiquePdf) => {
            if (antiquePdf.http_status) {
                this.props.dispatch({
                    type: 'REMOVE_AUTH',
                })
                this.props.navigation.navigate('Loading');
            } else {
            console.log(antiquePdf);
            this.props.dispatch ( { type: 'SET_ANTIQUE_PDF', payload: { antiquePdf } } )
            this.setState ( { loading: false } )
            }
        })

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
        console.log(this.props); 
        //const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true}
        return (  
            <SafeAreaView style = { { flex:1 } } > 
                <Container>
                    <Header navigation = { this.props.navigation } title = 'Certificado de Antigüedad' >
                        <HeaderBackButton onPress = { () => { this.props.navigation.goBack() } } />
                    </Header>
                    <Content padder>    
                    {this.state.loading ?
                            <ActivityIndicator color="#0098D0" size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} />
                            : (
                        <View>
                        <SendMail document={this.props.antiquePdf.base64} title='Solicitud documento de Antigüedad' nameDoc = {this.props.antiquePdf.nombre}/>
                        <ListItem>
                            <Body style = { { justifyContent: 'center', alignItems: 'center' } } >
                                <Text style = { { fontSize: 12 } }>{this.props.antiquePdf.nombre }</Text>
                            </Body> 
                        </ListItem>
                        <Pdf source={{uri: `data:application/pdf;base64,${ this.props.antiquePdf.base64 }`,cache:true}} onLoadComplete={(numberOfPages,filePath)=> { console.log(`number of pages: ${numberOfPages}`) }}
                            onPageChanged={(page,numberOfPages)=>{ console.log(`current page: ${page}`) }}
                            onError={(error)=> { console.log(error) }}
                            onPressLink={(uri)=> { console.log(`Link presse: ${uri}`) }}
                            style={styles.pdf}/>
                        </View> 
                        )
                        }
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
        height: 500,
    }
});

function mapStateToProps ( state ) { return {  auth: state.authReducer, antiquePdf : state.employeReducer.antiquePdf} }

export default connect ( mapStateToProps ) ( AntiquePdf )