//const BASE_API_PAD = 'http://10.71.249.55:8080/adm_educa/Med_get_lista_curso?p_grcu_sec=5016';
//const BASE_API_URL = 'http://10.71.249.55:8080/adm_educa/'
const BASE_API_URL = 'http://10.71.249.53:9090/rhu-ws/public/api/'

const CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8'
function getAccesEviroment(p_username, p_password) {
    credentials = {
        'grant_type': 'password',
        'client_id': 'RRHH',
        'client_secret': '7474-R2HR-35DR-HAD7-5E9R-E966-63HR-B85H',
        'username': p_username,
        'password': p_password,
    }
    var formBody = []
    for (var property in credentials) {
        var encodedKey = encodeURIComponent(property)
        var encodedValue = encodeURIComponent(credentials[property])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    return formBody.join("&")
}

class Api {
    //splash
    //Get app token
    async getAuth(p_username, p_password) {
        const PATH = 'auth/token'
        const result = await fetch(`${BASE_API_URL}${PATH}`, {
            method: 'POST',
            headers: { 'Content-Type': CONTENT_TYPE, },
            body: getAccesEviroment(p_username, p_password)
        })
            .then(async (query) => await query.json()
            )
            .catch(error => console.log('error', error))
        return result
    }

    //Get user data by employe
    async getEmployeData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/datos`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get contract data by employe
    async getContractData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/datos/contratos`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get permission data by employe
    async getPermissionData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/permiso`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get type permission
    async getTypePermissionData(p_auth, sector, tipo_ley, tipo_contrato) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/permiso/tipo_detalle/${sector}/${tipo_ley}/${tipo_contrato}`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //POST permission data by employe
    async postPermissionData(p_auth, data, fini, ffin, contrato) {
        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        paramspost = {
            'fecha_inicio': fini,
            'fecha_termino': ffin,
            'tipo_permiso': data.tipopermiso,
            'contrato': contrato,
            'cantidad_dias': data.Dias,
            'observacion': data.Obs,
        }
        var formBody = []
        for (var property in paramspost) {
            var encodedKey = encodeURIComponent(property)
            var encodedValue = encodeURIComponent(paramspost[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }
        var arrBody = formBody.join("&")

        const result = await fetch(`${BASE_API_URL}${PATH}/permiso`, {
            method: 'POST',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name'],
            },
            body: arrBody
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get holiday data by employe
    async getHolidayData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/vacaciones`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

        //Get Holidays Days
        async getHolidayDays(p_auth) {

            const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
            const PATH = `empleado/${p_auth.auth['x-user-name']}`
    
            const result = await fetch(`${BASE_API_URL}${PATH}/vacaciones/dias/${p_auth.auth.usuaSector}`, {
                method: 'GET',
                headers: {
                    Authorization: AUTHORIZATION,
                    'Content-Type': CONTENT_TYPE,
                    'x-user-name': p_auth.auth['x-user-name']
                },
            })
                .then(async (query) => await query.json())
                .catch(error => console.log('error', error))
    
            return result
        }

    //Post holiday 
    async postHolidayData(p_auth, data, fini, ffin, contrato, dias_dispo) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        paramspost = {
            'fecha_inicio': fini,
            'fecha_termino': ffin,
            'contrato': contrato,
            'cantidad_dias': data.Dias,
            'observacion': data.Obs,
            'dias_disp_h' : dias_dispo,
            'usuario_sol': p_auth.auth['dev-user-name']
        } 
        var formBody = [] 
        for (var property in paramspost) {
            var encodedKey = encodeURIComponent(property)
            var encodedValue = encodeURIComponent(paramspost[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }
        var arrBody = formBody.join("&")

        const result = await fetch(`${BASE_API_URL}${PATH}/vacaciones`, {
            method: 'POST',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name'],
            },
            body: arrBody
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get Image data by employe
    async getEmployeImage(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/foto/base64`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))
        return result
    }

    //Get settlement by employe
    async getSettlementData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/liquidacion`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get family by employe
    async getFamilyData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/familia`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

    //Get license by employe
    async getLicenceData(p_auth) {

        const AUTHORIZATION = `${p_auth.auth.token_type} ${p_auth.auth.access_token}`
        const PATH = `empleado/${p_auth.auth['x-user-name']}`

        const result = await fetch(`${BASE_API_URL}${PATH}/licencia`, {
            method: 'GET',
            headers: {
                Authorization: AUTHORIZATION,
                'Content-Type': CONTENT_TYPE,
                'x-user-name': p_auth.auth['x-user-name']
            },
        })
            .then(async (query) => await query.json())
            .catch(error => console.log('error', error))

        return result
    }

}

export default new Api();     