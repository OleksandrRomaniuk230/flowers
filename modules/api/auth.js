export default axios => ({
    async login(payload) {
        return await axios.post('auth/login', payload);
    },

    async register(payload) {
        return await axios.post('auth/register', payload);
    },

    async phone(payload) {
        return await axios.post('auth/phone', payload);
    },
    async changePassword(payload) {
        return await axios.post('auth/password', payload);
    },
    async country(payload) {
        return await axios.get('lists/countries', payload)
    },
    async cities(payload) {
        return await axios.get(`autocomplete/cities?q=${payload.q}`)
    },
    async kind() {
        return await axios.get('lists/attributes/kind/values')
    },
    async sort(payload) {
        return await axios.get(`lists/attributes/sort/values?${payload}`)
    },
    async color(payload) {
        return await axios.get(`lists/attributes/color/values?${payload}`)
    },
    async quality(payload) {
        return await axios.get(`lists/attributes/quality/values?${payload}`)
    },
    async plantations() {
        return await axios.get('lists/plantations')
    },
    async savesearches(payload) {
        return await axios.post('catalog/searches', payload)
    },
    async catalog(payload) {
        return await axios.get(`catalog?${payload}`)
    },
    async companies(payload) {
        return await axios.get('lists/countries/companies')
    },
    async searches() {
        return await axios.get('catalog/searches')
    },
    async delSearches(payload) {
        return await axios.delete(`catalog/${payload}/searches`)
    },
    async addFavorites(payload) {

        return await axios.post(`catalog/${payload}/favorites`)
    },
    async favorites(payload) {

        return await axios.get('catalog/favorites')
    },

});