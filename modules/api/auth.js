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
});