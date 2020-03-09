import React from 'react'
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Badge } from 'native-base'

function Family ( props ) {
    return (
        <List>
            <ListItem thumbnail onPress = { props.onPress } >
                <Left>
                    <Thumbnail resizeMethod="resize" source = { require ( '../../../assets/user.png' ) } />
                </Left> 
                <Body> 
                    <Text style = { { fontSize: 12 , fontWeight : 'bold'} } >{props.PERS_NOMBRE} {props.PERS_APELL_PAT} {props.PERS_APELL_MAT}</Text>
                    <Text note style = { { fontSize: 12 } }>Rut: {props.PERS_RUT_FMT}</Text>
                    <Text note style = { { fontSize: 12 } }>Parentesco: {props.DESC_DOM_PARENTESCO}</Text>
                    <Text note style = { { fontSize: 12 } }>Carga: {props.CARGA_FAMILIAR}</Text>
                </Body> 
            </ListItem>
        </List>
    )
}

export default Family