import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import API from '../../../utils/api'
import StudentInfoLayout from '../components/student-info-layout'
 
class StudentInfo extends Component {

    state = { studentImage: '' }

    async componentDidMount () {
            API.getEmployeImage ( auth, this.props )
            .then ( ( employeImage ) => {
                this.setState ( { studentImage: employeImage } )
            } )
    }

    periodPress = ( ) => { 
        this.props.dispatch ( NavigationActions.navigate ( { routeName: 'PeriodList' } ) )
    }

    render () {
        return (
            <StudentInfoLayout studentSelected = { this.props.student } studentImage = { this.state.employeImage } navigation = { this.props.navigation } 
                selectedPeriod = { this.props.selectedPeriod } onPress = { () => { this.periodPress ( ) } }  /> 
        )
    }
}

//function mapStateToProps ( state ) { return { student : state.studentReducer.selectedStudent, selectedPeriod : state.studentReducer.selectedPeriod } }
function mapStateToProps ( state ) { return { auth: state.authReducer } }

export default connect ( mapStateToProps ) ( StudentInfo )