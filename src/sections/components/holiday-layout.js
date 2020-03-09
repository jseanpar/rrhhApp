import React from 'react'
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Badge } from 'native-base'

renderRightPanel = ( props ) => {
    if ( props.DESC_DOM_ESTADO_PERMISO == 'PENDIENTE') {
        return (
            <Right style = { { position: 'absolute', right: 5, top: 30 } }>
            <Badge style = { { backgroundColor: '#f28b00' , justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_PERMISO }</Text>
            </Badge>
        </Right>
        )
    }
    else if ( props.DESC_DOM_ESTADO_PERMISO == 'AUTORIZADO' )  { 
        return ( 
            <Right style = { { position: 'absolute', right: 5, top: 30 } }>
                <Badge style = { { backgroundColor: '#4caf50' , justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                    <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_PERMISO }</Text>
                </Badge>
            </Right>
        )
    }
    else {
        return (
             <Right style = { { position: 'absolute', right: 5, top: 30  } }>
                <Badge danger style = { { justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                    <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_PERMISO }</Text>
                </Badge>
            </Right>
        )
    }
}

function Holiday ( props ) {
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
                <Text style = { { fontSize: 12 , fontWeight : 'bold'} } >Tipo Permiso:{props.DESC_DOM_TIPO_PERMISO} </Text>
                <Text style = { { fontSize: 12 } } >Cantidad Dias: { props.PEVA_DIAS_ASIG }</Text>
                <Text style = { { fontSize: 12 } } >Fecha Solicitud: { props.PEVA_FECH_SOL }</Text>
                <Text style = { { fontSize: 12 } } >Fecha Inicio: { props.PEVA_FECH_INI }</Text>
                <Text style = { { fontSize: 12 } } >Fecha Fin: { props.PEVA_FECH_FIN }</Text>
                    <Text note style = { { fontSize: 10 } }></Text>
                    { renderRightPanel ( props ) } 
                </Body>
            </ListItem>
        </List>
    )
}

export default Holiday