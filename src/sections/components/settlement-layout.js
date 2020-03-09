import React from 'react'
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Badge } from 'native-base'

function Settlement ( props ) {
    return (
        <List>
            <ListItem thumbnail onPress = { props.onPress } >
                { /*<Left>
                    { props.studentImage ? 
                        <Thumbnail source = { { uri: `data:image/png;base64,${ props.studentImage }`} } />
                    :
                        <Thumbnail resizeMethod="resize" source = { require ( '../../../assets/user.png' ) } />
                    }
                </Left> */}  
                <Body> 
                <Text style = { { fontSize: 12 , fontWeight : 'bold'} } >{props.PERIODO} </Text>
                    <Text note style = { { fontSize: 10 } }></Text>
                </Body>
                <Left>
                    <Text note style = { { fontSize: 10 } }>Descargar</Text>
                </Left>
            </ListItem>
        </List>
    )
}

export default Settlement