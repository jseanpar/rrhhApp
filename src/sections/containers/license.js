import React, { Component } from 'react'

import API from '../../../utils/api'
import LicenseLayout from '../components/license-layout'
 
class License extends Component {

    render () {
        return (
            <LicenseLayout { ...this.props } onPress = { this.props.onPress } />
        )
    }
}

export default License 