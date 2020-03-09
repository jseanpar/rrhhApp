import React, { Component } from 'react'

import API from '../../../utils/api'
import FamilyLayout from '../components/family-layout'
 
class Family extends Component {

    render () {
        return (
            <FamilyLayout { ...this.props } onPress = { this.props.onPress } />
        )
    }
}

export default Family 