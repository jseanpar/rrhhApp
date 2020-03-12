import React, { Component } from 'react'
import { SafeAreaView, BackHandler, FlatList, View, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Container, Content, Body, List, Left, ListItem, Separator, Thumbnail } from 'native-base'

import API from '../../../utils/api'
import Header from '../../sections/containers/header'
import HeaderBackButton from '../../sections/components/header-back-button'


class EmployeList extends Component {

    state = { loading: true }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    static navigationOptions = () => { return { header: null, } }

    async componentDidMount() {
        await API.getEmployeData(this.props.auth)
            .then((employeList) => {

                if (employeList.http_status) {
                    this.props.dispatch({
                        type: 'REMOVE_AUTH',
                    })
                    this.props.navigation.navigate('Loading');
                } else {
                    this.props.dispatch({ type: 'SET_EMPLOYE_LIST', payload: { employeList } })

                    API.getEmployeImage(this.props.auth)
                        .then((employeImage) => {
                            this.props.dispatch({ type: 'SET_IMAGE_EMPLOYEE', payload: { employeImage } })

                            API.getContractData(this.props.auth).then((contractList) => {
                                this.props.dispatch({ type: 'SET_CONTRACT_LIST', payload: { contractList } })
                                this.setState({ loading: false })
                            });
                        })
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

        console.log(this.props)
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <Container>
                    <Header navigation={this.props.navigation} title='Antecedentes Personales' >
                        <HeaderBackButton onPress={() => { this.props.navigation.goBack() }} />
                    </Header>
                    <List>
                        <ListItem avatar >
                            <Left>
                                {this.props.employeImage ?
                                    <Thumbnail style={{ width: 50, height: 50, marginTop: 5 }} source={{ uri: `data:image/png;base64,${this.props.employeImage.FOTO_BASE64}` }} />

                                    :
                                    <Thumbnail style={{ width: 50, height: 50, marginTop: 5 }} source={require('../../../assets/user.png')} />
                                }
                            </Left>
                            <Body>
                                {this.props.employeList ?
                                    <View>
                                        <Text style={{ fontSize: 14, marginTop: 5 }} >{this.props.employeList.PERS_NOMBRE} {this.props.employeList.PERS_APELL_PAT} {this.props.employeList.PERS_APELL_MAT}</Text>
                                        <Text note style={{ fontSize: 14 }} >Rut: {this.props.employeList.PERS_RUT}-{this.props.employeList.PERS_DIV} </Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ fontSize: 14, marginTop: 5 }} >-</Text>
                                        <Text note style={{ fontSize: 14 }} > - </Text>
                                    </View>
                                }
                            </Body>
                        </ListItem>
                    </List>
                    <Content padder>
                        {this.state.loading ?
                            <ActivityIndicator color="#0098D0" size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }} />
                            :
                            (<View style={{ marginTop: 5 }} >
                                <Separator bordered style={{ marginTop: 5 }}>
                                    <Text>Datos Personales</Text>
                                </Separator>
                                <ListItem>
                                    <Text>Nombre: {this.props.employeList.PERS_NOMBRE} {this.props.employeList.PERS_APELL_PAT} {this.props.employeList.PERS_APELL_MAT}</Text>
                                </ListItem>
                                <ListItem last>
                                    <Text>Rut: {this.props.employeList.PERS_RUT}-{this.props.employeList.PERS_DIV} </Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Nacionalidad: {this.props.employeList.PERS_NACIONALIDAD}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Salud: {this.props.employeList.PERS_NACIONALIDAD}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Previsión: {this.props.employeList.DESC_PREV}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Teléfono: {this.props.employeList.PERS_TEL_CONT}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Email: {this.props.employeList.PERS_EMAIL}</Text>
                                </ListItem>
                                <Separator bordered>
                                    <Text>Datos Contrato</Text>
                                </Separator>
                                <ListItem>
                                    <Text>Cargo: {this.props.contractList[0].DESC_DOM_CARGO}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Sector: {this.props.contractList[0].DESC_DOM_SECTOR}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Tipo de Ley: {this.props.contractList[0].DESC_DOM_TIPO_LEY}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Tipo Contrato: {this.props.contractList[0].DESC_DOM_TIPO_CONTRATO}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Fecha Inicio: {this.props.contractList[0].CONT_FECH_INI}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Fecha Termino: {this.props.contractList[0].CONT_FECH_FIN}</Text>
                                </ListItem>
                            </View>)
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) { return { auth: state.authReducer, employeImage: state.employeReducer.employeImage, employeList: state.employeReducer.employeList, contractList: state.employeReducer.contractList } }

export default connect(mapStateToProps)(EmployeList)