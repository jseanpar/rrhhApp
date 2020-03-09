import React, { Component } from 'react'

import API from '../../../utils/api'
import SettlementLayout from '../components/settlement-layout'
 
class Settlement extends Component {

    render () {
        return (
            <SettlementLayout { ...this.props } onPress = { this.props.onPress } />
        )
    }
}

export default Settlement 