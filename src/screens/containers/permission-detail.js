import React, { Component } from 'react';
import { SafeAreaView, BackHandler, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Body, Text, View } from 'native-base';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf'

import API from '../../../utils/api'
import Header from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'

class PermissionDetail extends Component {

    state = { loading: true }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount() {

        API.getPermissionReceipt(this.props.auth, this.props.selectedPermission.PERM_SEC).then((permission) => {
            this.props.dispatch({ type: 'SET_PERMISSION', payload: { permission } })
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
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <Container>
                    <Header navigation={this.props.navigation} title='Comprobante Permiso' >
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
                                    <Text style={{ fontSize: 12 }}>{this.props.permission.nombre}</Text>
                                </View>
                            </Body>
                        </ListItem>
                        <Pdf source={{ uri: `data:application/pdf;base64,${this.props.permission.base64}`, cache: true }} onLoadComplete={(numberOfPages, filePath) => { console.log(`number of pages: ${numberOfPages}`) }}
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

function mapStateToProps(state) { return { auth: state.authReducer, selectedPermission: state.employeReducer.selectedPermission, permission: state.employeReducer.permission } }

export default connect(mapStateToProps)(PermissionDetail)