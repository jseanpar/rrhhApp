import React, { Component } from 'react'

import API from '../../../utils/api'
import HolidayLayout from '../components/holiday-layout'
 
class Holiday extends Component { 

    render () {
        return (
            <HolidayLayout { ...this.props } onPress = { this.props.onPress } />
        )
    }
}

export default Holiday 