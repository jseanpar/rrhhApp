import React, { Component } from 'react'
import { SafeAreaView, BackHandler, View, ActivityIndicator } from 'react-native';
import { Container, Content, Text, Badge } from 'native-base';
import { connect } from 'react-redux';
import { Calendar, LocaleConfig } from 'react-native-calendars'

import API from '../../../utils/api';
import Header  from '../../sections/containers/header';
import HeaderBackButton from '../../sections/components/header-back-button'
import SudentInfo from '../../sections/containers/student-info';

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene.','Feb.','MAr','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
    dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    today: 'Hoy\'Hoy'
  };
  LocaleConfig.defaultLocale = 'es';

class Attendance extends Component { 

    state = { loading: true, marked: null, }

    constructor ( props ) {
        super ( props )
        this.handleBackButtonClick = this.handleBackButtonClick.bind ( this )
    }

    static navigationOptions = () => { return { header: null } }
    
    componentDidMount = async () => {
        await API.getAuth()
        .then ( ( auth ) => {
            API.getAttendanceListByStudent ( auth, this.props.student.grcu_sec, this.props.student.fial_sec_alum )
            .then ( ( attendanceList ) => {
                this.props.dispatch ( { type: 'SET_ATTENDANCE_LIST', payload: { attendanceList } } )
                this.setState ( { loading: false } )
                this.renderAttendance ( attendanceList )
            } )
        } )
        BackHandler.addEventListener ( 'hardwareBackPress', this.handleBackButtonClick )
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener ( 'hardwareBackPress', this.handleBackButtonClick ) 
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack ( null )
        return true
    }

    getColor = ( status ) => {
        switch ( status ) {
            case 'AUSENTE':
                return '#C54240'
            break
            case 'FERIADO':
                return '#F9F871'
            break
            case "NOAPLICA":
                return '#76FAC7'
            break
            case "PENDIENTE":
                return '#0098D0'
            break
            case "PRESENTE":
                return '#33C191'
            break
            default:
                return ''
        }
    }

    renderAttendance = ( attendanceList ) =>  {
        var dataArray = []
        for ( var o in attendanceList ) {
            dataArray.push ( [attendanceList[o].ascu_fec_asistencia.substring ( 0, 10 ), this.getColor( attendanceList[o].ascu_asistencia ) ] )
        }
        var obj = dataArray.reduce ( ( c, v ) => Object.assign ( c, { [v[0]]: { selected: true, selectedColor: v[1] } } ), {} )
        this.setState ( { marked : obj } )
    }

    render() {
        return (
            <SafeAreaView style = { { flex:1 } } >
                <Container>
                    <Header navigation = { this.props.navigation } title = 'Asistencia' >
                        <HeaderBackButton onPress = { () => { this.props.navigation.goBack () } } />
                    </Header>
                    <Content padder>
                        <SudentInfo navigation = { this.props.navigation } />
                        { this.state.loading ? 
                            <ActivityIndicator color = "#0098D0" size = "large" style = {{flex: 1, justifyContent: 'center', alignItems: 'center', height: 200}} />
                        : 
                            <View>
                                <Calendar firstDay={1} markedDates = { this.state.marked } />
                                <View style = { { flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' } } >
                                    <Badge style = { { justifyContent: 'center', alignItems: 'center', backgroundColor: '#33C191', margin: 4 } } ><Text>Presente</Text></Badge>
                                    <Badge style = { { justifyContent: 'center', alignItems: 'center', backgroundColor: '#C54240', margin: 4 } } ><Text>Ausente</Text></Badge>
                                    <Badge style = { { justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F871', margin: 4 } } ><Text>Feriado</Text></Badge>
                                </View>
                                <View style = { { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } } >
                                    <Badge style = { { justifyContent: 'center', alignItems: 'center', backgroundColor: '#0098D0', margin: 4 } } ><Text>Pendiente</Text></Badge>
                                    <Badge style = { { justifyContent: 'center', alignItems: 'center', backgroundColor: '#76FAC7', margin: 4 } } ><Text>No aplica</Text></Badge>
                                </View>
                            </View>
                        }
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

function mapStateToProps ( state ) { return { student : state.studentReducer.selectedStudent, attendanceList: state.studentReducer.attendanceList } }

export default connect ( mapStateToProps ) ( Attendance );