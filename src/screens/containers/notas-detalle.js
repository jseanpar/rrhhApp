import React, { Component } from 'react';
import {
    View, StyleSheet, Image
} from 'react-native';

import {
    Container,
    Content,
    Text
} from 'native-base';

import Header from '../../sections/components/header';

import Icon from "react-native-vector-icons/FontAwesome5";
import Close from '../../sections/components/close';
import { connect } from 'react-redux';

import NotasDetalleList from '../../videos/containers/notas-detalle-list';

class NotasDetalle extends Component {

    static navigationOptions = () => {
        return {
            header: null,
            title: 'Detalle Notas',
            tabBarIcon: <Icon
                name="list"
                size={15}
                color='#92c93d'
                style={styles.search}
            />,
            drawerIcon: <Icon
                name="user"
                size={15}
                color='#92c93d'
                style={styles.searchDrawer}
            />
        }
    }
    render() {
        console.log('pantalla de notas');
        console.log(this.props.movie.image);
        return (
            <Container>
                <Header navigation={this.props.navigation}>
                    <Close
                        onPress={() => { this.props.navigation.goBack() }}
                    />
                </Header>
                <Content>
                    <NotasDetalleList />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnPad: {
        margin: 10,
    },
    logoAlumno: {
        height : 100,
        width : 100,
        borderRadius:50,
    },
    elevationLow: {
        ...Platform.select({
          ios: {
            height : 100,
            width : 100,
            shadowColor: '#000',
            shadowOpacity: 2.2,
            borderRadius: 50, 
            shadowRadius: 2,    
          },
          android: {
            height : 100,
            width : 100,
            shadowColor: '#000',
            elevation: 5, 
            borderRadius: 50,
            shadowOffset: {
                height: 1, 
                width: 1
            },
            shadowColor: '#000000'
          }
        }),
      },
    wapper: {
        borderColor: 'black',
        width: 300,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    }, 
    boton2: {
        backgroundColor: '#36a3f7',
        width: 150,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    letraAlumno: {
        color: 'black',
        fontSize: 20,
    },
    letra14Btn: {
        color: 'black',
        fontSize: 14,
    }
})


function mapStateToProps(state) {
    return {
        movie: state.videos.selectedMovie
    }
}

export default connect(mapStateToProps)(NotasDetalle)