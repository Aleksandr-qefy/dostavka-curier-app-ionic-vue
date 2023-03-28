export default {
    state: {
        UserCountry: null,
    },
    actions: {
        SET_COUNTRY(context, country) {
            context.commit('SET_COUNTRY', country);
        },
    },
    mutations: {
        SET_COUNTRY(state, payload) {
            state.UserCountry = payload;//JSON.parse(JSON.stringify(payload));
        },
    },
    getters: {
      GET_COUNTRY(state) {
        return state.UserCountry
      },
    }
}