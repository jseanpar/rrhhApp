import React, { Component } from 'react';
import { SafeAreaView, BackHandler, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text, View } from 'native-base';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf'

import API from '../../../utils/api'
import Header from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'

class SettlementDetail extends Component {

    state = { loading: true }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount() {

        API.getSettlementPdf(this.props.auth, this.props.selectedSettlement.PERI_COD).then((settlement) => {
            this.props.dispatch({ type: 'SET_SETTLEMENT', payload: { settlement } })
            this.setState({ loading: false })
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
                    <Header navigation={this.props.navigation} title='Liquidación' >
                        <HeaderBackButton onPress={() => { this.props.navigation.goBack() }} />
                    </Header>
                    <Content padder>
                    {this.state.loading ?
                            <ActivityIndicator color="#0098D0" size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} />
                            : (
                        <View> 
                        <ListItem>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <View>
                                    <Text style={{ fontSize: 12 }}>{this.props.settlement.nombre}</Text>
                                </View>
                            </Body>
                        </ListItem>
                        <Pdf source={{ uri: `data:application/pdf;base64,${this.props.settlement.base64}`, cache: true }} onLoadComplete={(numberOfPages, filePath) => { console.log(`number of pages: ${numberOfPages}`) }}
                            onPageChanged={(page, numberOfPages) => { console.log(`current page: ${page}`) }}
                            onError={(error) => { console.log(error) }}
                            onPressLink={(uri) => { console.log(`Link presse: ${uri}`) }}
                            style={styles.pdf} />
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
        flex: 1,
        width: Dimensions.get('window').width,
        height: 500,
    }
});

function mapStateToProps(state) { return { auth: state.authReducer, selectedSettlement: state.employeReducer.selectedSettlement, settlement: state.employeReducer.settlement } }

export default connect(mapStateToProps)(SettlementDetail)