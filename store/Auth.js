const SET_TOKEN = 'SET_TOKEN'
const RESET_TOKEN = 'RESET_TOKEN'
const SET_TOKEN_VERIFY = 'SET_TOKEN_VERIFY'
const SET_EMAIL_SERVICE = 'SET_EMAIL_SERVICE'
const LOGAUT = 'LOGAUT'
const SET_COUNTRIES = 'SET_COUNTRIES'

export const state = () => ({
    token: null,
    email_service: null,
    countries: [],
})

export const getters = {
    token: state => state.token,
    email_service: state => state.email_service,
    countries: state => state.countries,
}

export const actions = {
    async login({ commit }, payload) {
        let data = await this.$rest_api.auth.login(payload)
        await commit('SET_TOKEN', data)
        return data
    },
    async register({ commit }, payload) {

        let { data } = await this.$rest_api.auth.register(payload)
        return data
    },
    async verification({ commit }, payload) {
        let { data } = await this.$rest_api.auth.verification(payload)
        await commit('SET_TOKEN_VERIFY', data)
        return data
    },

    async recovery({ commit }, payload) {
        let { data } = await this.$rest_api.auth.recovery(payload)
        await commit('SET_EMAIL_SERVICE', data)
        return data
    },
    async logout({ commit }, payload) {
        commit('LOGAUT')
    },
    async getCountries({ commit }, payload) {
        let { data } = await this.$rest_api.auth.country(payload)
        commit('SET_COUNTRIES', data)
        return data
    },
    async getCities({ commit }, payload) {
        let { data } = await this.$rest_api.auth.cities(payload)
        return data
    },
}

export const mutations = {
    [SET_TOKEN](state, payload) {
        if (payload.data.token !== undefined) {
            this.$cookies.set('token', payload.data.token, {
                path: '/',
                secure: true,
                expires: new Date(payload.data.exp * 1000),
            })
            state.token = payload.data.token
        }
    },
    [RESET_TOKEN](state) {
        state.token = this.$cookies.get('token')
    },
    [SET_TOKEN_VERIFY](state, payload) {
        if (payload.token !== undefined) {
            this.$cookies.set('token', payload.token, {
                path: '/',
                secure: true,
                expires: new Date(payload.exp * 1000),
            })
            state.token = payload.token
        }
    },
    [SET_EMAIL_SERVICE](state, payload) {
        if (payload.emailService !== undefined) {
            state.email_service = payload.emailService.url
        } else {
            state.email_service = ''
        }
    },
    [LOGAUT](state) {
        this.$cookies.remove('token')
        this.$cookies.remove('role')
        state.token = null
    },
    [SET_COUNTRIES](state, payload) {
        state.countries = payload
    },
}