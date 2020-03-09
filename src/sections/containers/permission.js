import React, { Component } from 'react'

import API from '../../../utils/api'
import PermissionLayout from '../components/permission-layout'
 
class Permision extends Component {

    render () {
        return (
            <PermissionLayout { ...this.props } onPress = { this.props.onPress } />
        )
    }
}

export default Permision 