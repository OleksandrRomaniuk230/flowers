const SET_TOKEN = 'SET_TOKEN'
const RESET_TOKEN = 'RESET_TOKEN'
const SET_TOKEN_VERIFY = 'SET_TOKEN_VERIFY'
const SET_EMAIL_SERVICE = 'SET_EMAIL_SERVICE'
const LOGAUT = 'LOGAUT'
const SET_COUNTRIES = 'SET_COUNTRIES'
const SET_KIND = 'SET_KIND'
const SET_COLOR = 'SET_COLOR'
const SET_QUALITY = 'SET_QUALITY'
const SET_PLANTATION = 'SET_PLANTATION'
const SET_ITEMS = 'SET_ITEMS'
const SET_COUNTRIES_COMPANIES = 'SET_COUNTRIES_COMPANIES'


export const state = () => ({
    token: null,
    email_service: null,
    countries: [],
    kind: [],
    sort: [],
    color: [],
    quality: [],
    plantation: [],
    items: [],
    countriesCompanies: [],

})

export const getters = {
    token: state => state.token,
    email_service: state => state.email_service,
    countries: state => state.countries,
    kind: state => state.kind,
    sort: state => state.sort,
    color: state => state.color,
    quality: state => state.quality,
    plantation: state => state.plantation,
    items: state => state.items,
    countriesCompanies: state => state.countriesCompanies,

}

export const actions = {
    async login({ commit }, payload) {
        let { data } = await this.$rest_api.auth.login(payload)
        await commit('SET_TOKEN', data)
        return data
    },
    async register({ commit }, payload) {
        let { data } = await this.$rest_api.auth.register(payload)
        return data
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
    async getKind({ commit }, ) {
        let { data } = await this.$rest_api.auth.kind()
        return data
    },
    async getSort({ commit }, payload) {
        let { data } = await this.$rest_api.auth.sort(payload)
        return data
    },
    async getColor({ commit }, payload) {
        let { data } = await this.$rest_api.auth.color(payload)
        commit('SET_COLOR', data)
        return data
    },
    async getQuality({ commit }, payload) {
        let { data } = await this.$rest_api.auth.quality(payload)
        return data
    },
    async getPlantations({ commit }, payload) {
        let { data } = await this.$rest_api.auth.plantations(payload)
        await commit('SET_PLANTATION', data)
        return data
    },
    async saveSearches({ commit }, payload) {
        let { data } = await this.$rest_api.auth.searches(payload)
    },
    async getCatalog({ commit }, payload) {
        let { data } = await this.$rest_api.auth.catalog(payload)
        commit('SET_ITEMS', data.data)
        return data
    },
    async getCatalog({ commit }, payload) {
        let { data } = await this.$rest_api.auth.catalog(payload)
        commit('SET_ITEMS', data.data)
        return data
    },
    async getCountriesCompanies({ commit }, payload) {
        let { data } = await this.$rest_api.auth.companies(payload)
        commit('SET_COUNTRIES_COMPANIES', data)
        return data
    },
}

export const mutations = {
    [SET_TOKEN](state, payload) {
        if (payload !== undefined) {
            this.$cookies.set('token', payload.access_token, {
                secure: true,
                expires_in: new Date(payload.expires_in * 1000)
            })

            state.token = payload
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

    [SET_COUNTRIES](state, payload) {
        state.countries = payload
    },
    [SET_KIND](state, payload) {
        state.kind = payload
    },
    [SET_COLOR](state, payload) {
        state.color = payload
    },
    [SET_QUALITY](state, payload) {
        state.quality = payload
    },
    [SET_PLANTATION](state, payload) {
        state.plantation = payload
    },
    [SET_ITEMS](state, payload) {
        state.items = payload
    },
    [SET_COUNTRIES_COMPANIES](state, payload) {
        state.countriesCompanies = payload
    },
}