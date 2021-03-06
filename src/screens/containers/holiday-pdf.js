import React, { Component } from 'react';
import { SafeAreaView, BackHandler, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf'

import API from '../../../utils/api'
import Header from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import SendMail from '../../sections/containers/send-mail';

class HolidayPdf extends Component {

    state = { loading: true }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount() {

        await API.getHolidayPdf(this.props.auth).then((holidayPdf) => {
            if (holidayPdf.http_status) {
                this.props.dispatch({
                    type: 'REMOVE_AUTH',
                })
                this.props.navigation.navigate('Loading');
            } else {
                console.log(holidayPdf);
                this.props.dispatch({ type: 'SET_HOLIDAY_PDF', payload: { holidayPdf } })
                this.setState({ loading: false })
            }
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null)
        return true
    }

    render() {
        console.log(this.props);
        //const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true}
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <Container>
                    <Header navigation={this.props.navigation} title='Certificado de Vacaciones' >
                        <HeaderBackButton onPress={() => { this.props.navigation.goBack() }} />
                    </Header>
                    <Content padder> 
                        {this.state.loading ?
                            <ActivityIndicator color="#0098D0" size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} />
                            : (
                                <View>
                                <SendMail document={this.props.holidayPdf.base64} title='Solicitud documento de vacaciones disponibles' nameDoc = {this.props.holidayPdf.nombre}/>
                                <ListItem> 
                                    <Body style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <View>
                                            <Text style={{ fontSize: 12 }}>{this.props.holidayPdf.nombre}</Text>
                                        </View>
                                    </Body>
                                </ListItem>
                                <Pdf source={{ uri: `data:application/pdf;base64,${this.props.holidayPdf.base64}`, cache: true }} onLoadComplete={(numberOfPages, filePath) => { console.log(`number of pages: ${numberOfPages}`) }}
                                    onPageChanged={(page, numberOfPages) => { console.log(`current page: ${page}`) }}
                                    onError={(error) => { console.log(error) }}
                                    onPressLink={(uri) => { console.log(`Link presse: ${uri}`) }}
                                    style={styles.pdf} />
                                </View>)
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 500,
    }
});

function mapStateToProps(state) { return { auth: state.authReducer, holidayPdf: state.employeReducer.holidayPdf } }

export default connect(mapStateToProps)(HolidayPdf)