import React, { Component } from 'react';
import { SafeAreaView, BackHandler, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text } from 'native-base';
import { connect } from 'react-redux';

import API from '../../../utils/api'
import Header from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import Empty from '../../sections/components/empty'
import Settlement from '../../sections/containers/settlement'

class SettlementList extends Component {

    state = { loading: true }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount() {

        await API.getSettlementData(this.props.auth).then((settlementList) => {

            if (settlementList.http_status) {
                this.props.dispatch({
                    type: 'REMOVE_AUTH',
                })
                this.props.navigation.navigate('Loading');
            } else {

                this.props.dispatch({ type: 'SET_SETTLEMENT_LIST', payload: { settlementList } })
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

    keyExtractor = item => item.PERI_COD.toString()
    renderEmpty = () => <Empty text="No se encontraron registros" />

    renderItem = ({ item }) => {
        return (
            <Settlement {...item} />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <Container>
                    <Header navigation={this.props.navigation} title='Liquidaciones' >
                        <HeaderBackButton onPress={() => { this.props.navigation.goBack() }} />
                    </Header>
                    <Content padder>
                        {this.state.loading ?
                            <ActivityIndicator color="#0098D0" size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} />
                            : (
                                <FlatList keyExtractor={this.keyExtractor} data={this.props.employe.settlementList} ListEmptyComponent={this.renderEmpty}
                                    renderItem={this.renderItem} />)
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) { return { auth: state.authReducer, employe: state.employeReducer } }

export default connect(mapStateToProps)(SettlementList)