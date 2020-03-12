import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'native-base'
import Loading from './screens/containers/loading'
import Login from './screens/containers/login'
import MessageList from './screens/containers/message-list'
import StudentList from './screens/containers/student-list'
import ChangePassword from './screens/containers/change-password'
import CloseSession from './screens/containers/close-session' 
import PeriodList from './screens/containers/period-list'
import Dashboard from './screens/containers/dashboard'

import EmployeList from './screens/containers/employe-list'
import PermissionList from './screens/containers/permission-list'
import HolidayList from './screens/containers/holiday-list'
import SettlementList from './screens/containers/settlement-list' 
import FamilyList from './screens/containers/family-list'
import LicenseList from './screens/containers/license-list'
import LicenseDetails from './screens/containers/license-detail'
import HolidayDetail from './screens/containers/holiday-detail'
import PermissionForm from './screens/containers/permission-form'
import HolidayForm from './screens/containers/holiday-form'
import SettlementDetail from './screens/containers/settlement-detail'
import Certificates from './screens/containers/certificates'
import HolidayPdf from './screens/containers/holiday-pdf' 
import AntiquePdf from './screens/containers/antique-pdf'
import ForeignPdf from './screens/containers/foreign-pdf'
import InternshipPdf from './screens/containers/internship-pdf'
import PermissionDetail from './screens/containers/permission-detail'

import DrawerComponent from './sections/components/drawer'

const Main = createStackNavigator ( {  
    Dashboard : Dashboard,
    EmployeList : EmployeList, 
    PermissionList : PermissionList,
    HolidayList : HolidayList,
    SettlementList : SettlementList,
    FamilyList : FamilyList,
    LicenseList : LicenseList,
    LicenseDetails :LicenseDetails,  
    PermissionForm : PermissionForm,
    HolidayForm : HolidayForm, 
    SettlementDetail : SettlementDetail,   
    Certificates : Certificates,
    HolidayPdf : HolidayPdf,
    AntiquePdf : AntiquePdf,
    ForeignPdf : ForeignPdf,
    InternshipPdf : InternshipPdf,
    HolidayDetail : HolidayDetail, 
    PermissionDetail : PermissionDetail,
},
{
    defaultNavigationOptions: {
        gesturesEnabled: true,
        title: 'Inicio',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#0098D0',
          },
          headerTitleStyle: {
            fontSize: 18,
          },
    },
    mode: 'modal',
} )

const DrawerNavigation = createDrawerNavigator ( {
    Main: {
        screen: Main,
        navigationOptions: {
            title: 'Inicio',
            //drawerIcon: <Icon name="ios-home" style = { { fontSize: 16, color: '#0098D0' } } />,
            drawerLabel: () => null
        }
    }, 
    StudentList: {
        screen: Dashboard,
        navigationOptions:{
            title: 'Home',
            drawerIcon: <Icon name = "md-apps" style = { { fontSize: 16, color: '#0098D0' } } />
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions:{
            title: 'Cambiar Contraseña',
            drawerIcon: <Icon name = "md-key" style = { { fontSize: 16, color: '#0098D0' } } />
        } 
    },
    Login: {
        screen: CloseSession,
        navigationOptions: {
            title: 'Cerrar sesión',
            
            drawerIcon: <Icon name = "md-power" style = { { fontSize: 16, color: '#0098D0' } } />
        }
    }
},
{
    drawerWidth: 180,
    drawerBackgroundColor: '#fff',
    drawerPosition: 'right',
    drawerType: 'slide',
    keyboardDismissMode: 'none',
    contentComponent: DrawerComponent,
    contentOptions: {
        activeBackgroundColor: '#eaeaeb', 
        activeTintColor: '#0098D0',
        inactiveTintColor: '#8e8e93',
        inactiveBackgroundColor: '#fff',
        itemStyle: {
            //borderBottomWidth: .5,
            //borderBottomColor: '#eaeaeb',
        }, 
        labelStyle: {
            fontFamily: 'Roboto',
            
            marginHorizontal: 0,
        },
        iconContainerStyle: {
            marginHorizontal: 4,
        }
    }
})

const SwitchNavigator = createSwitchNavigator (
    {
        App: DrawerNavigation,
        Login: Login,
        Loading: Loading,
    },
    {
        initialRouteName: 'Loading', 
    }
)

export default createAppContainer ( SwitchNavigator )