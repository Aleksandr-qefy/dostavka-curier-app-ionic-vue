export default {
    state: {
        phone: null,
        document: null,

        surname: null,
        name: null,
        patronymic: null,

    },
    actions: {
        SET_PHONE(context, phoneNumber) {
            context.commit('SET_PHONE', phoneNumber);

        },
        SET_DOCUMENT(context, documentObj) {
            context.commit('SET_DOCUMENT', documentObj);

        },
        SET_SURNAME(context, surname) {
            context.commit('SET_SURNAME', surname);

        },
        SET_NAME(context, name) {
            context.commit('SET_NAME', name);

        },
        SET_PATRONYMIC(context, patronymic) {
            context.commit('SET_PATRONYMIC', patronymic);

        },
    },
    mutations: {
        SET_PHONE(state, payload) {
            state.phone = payload;//JSON.parse(JSON.stringify(payload));
        },
        SET_DOCUMENT(state, payload) {
            //state.document = JSON.parse(JSON.stringify(payload));
            state.document = payload;
        },
        SET_SURNAME(state, payload) {
            state.surname = payload;//JSON.parse(JSON.stringify(payload));
        },
        SET_NAME(state, payload) {
            state.name = payload;//JSON.parse(JSON.stringify(payload));
        },
        SET_PATRONYMIC(state, payload) {
            state.patronymic = payload;//JSON.parse(JSON.stringify(payload));
        },
    },
    getters: {
      GET_PHONE(state) {
        return state.phone
      },
      GET_DOCUMENT(state) {
        return state.document
      },
      GET_SURNAME(state) {
        return state.surname
      },
      GET_NAME(state) {
        return state.name
      },
      GET_PATRONYMIC(state) {
        return state.patronymic
      },
    }
}