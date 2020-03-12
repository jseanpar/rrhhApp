import React, { Component } from 'react';
import { connect } from 'react-redux'

import API from '../../../utils/api';
import LoadingLayout from '../../sections/components/loading'

class Loading extends Component {
  
    componentDidMount () {
 
        if ( this.props.auth) { 
            this.props.navigation.navigate ( 'Dashboard' ) 
        }
        else {
            this.props.navigation.navigate ( 'Login' )
        }
    } 
    render () { 
        return (
            <LoadingLayout />
        )   
    }
} 

function mapStateToProps ( state ) { return { auth: state.authReducer.auth } }

export default connect ( mapStateToProps ) ( Loading )