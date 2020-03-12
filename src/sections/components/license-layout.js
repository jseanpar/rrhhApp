import React from 'react'
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Badge, Icon} from 'native-base'


renderRightPanelPermissionLicense = ( props ) => {
    if ( props.DESC_DOM_ESTADO_LICENCIA == 'INGRESADA' ) { 
        return (
            <Right style = { { position: 'absolute', right: 5, top: 30 } }>
            <Badge style = { { backgroundColor: '#0081C9' , justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_LICENCIA }</Text>
            </Badge>
        </Right>   
        ) 
    }
    if ( props.DESC_DOM_ESTADO_LICENCIA == 'PAGADA' ) { 
        return (
            <Right style = { { position: 'absolute', right: 5, top: 30 } }>
            <Badge style = { { backgroundColor: '#0081c9' , justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_LICENCIA }</Text>
            </Badge> 
        </Right>  
        )
    }
    else if ( props.DESC_DOM_ESTADO_LICENCIA == 'AUTORIZADA' )  { 
        return ( 
            <Right style = { { position: 'absolute', right: 5, top: 30 } }>
                <Badge style = { { backgroundColor: '#4caf50' , justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                    <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_LICENCIA } </Text>
                </Badge>
            </Right>     
        )
    } 
    else {
        return (
             <Right style = { { position: 'absolute', right: 5, top: 30  } }>
                <Badge danger style = { { justifyContent: 'center', alignItems: 'center', width: 80, height: 20 } } >
                    <Text style = { { fontSize: 8 } } >{ props.DESC_DOM_ESTADO_LICENCIA }</Text>
                </Badge>
            </Right>
        )
    } 
}

function License ( props ) {

    return (
        <List>
            <ListItem thumbnail onPress = { props.onPress } > 
                <Body> 
                <Text style = { { fontSize: 12 , fontWeight : 'bold'} } >Número Licencia:{props.LIME_NUMERO} </Text>
                <Text style = { { fontSize: 12 } } >Fecha Emisión: { props.LIME_FECH_EMIS }</Text>
                <Text style = { { fontSize: 12 } } >Fecha Inicio: { props.LIME_FECH_INI }</Text>
                <Text style = { { fontSize: 12 } } >Fecha Termino: { props.LIME_FECH_FIN }</Text>
                <Text style = { { fontSize: 12 } } >Total Días: { props.LIME_DIAS }</Text> 
                    <Text note style = { { fontSize: 10 } }></Text>
    { renderRightPanelPermissionLicense ( props ) }  
                </Body>
            </ListItem>
        </List>
    )
}

export default License