
export default {
    state: {
        lastLocation: null, //{ lat: 55.753978, lng: 37.620113 },
        lastGeocoding: null, /*{address_components: [
                {
                    long_name: "Москва",
                    types: ["locality", "political"]
                },
                {
                    long_name: "Москва",
                    types: ["administrative_area_level_2", "political"]
                },
                {
                    long_name: "Россия",
                    types: ["country"]
                }
            ]},
        /*phone: {
            value: "",
            checked: false,
            },
        code: 1001,
        phonePostNumberError: false,
        phonePostNumber: 0,*/
        formattedAddress: null,
        radius: null,
        travelMode: null,
        selfie: null,
    },
    actions: {
        SET_LAST_LOCATION(context, locationObj) {
            context.commit('SET_LAST_LOCATION', locationObj);

        },
        SET_SELFIE(context, image) {
            context.commit('SET_SELFIE', image);

        }
    },
    mutations: {
        SET_LAST_LOCATION(state, payload) {
            state.lastLocation = JSON.parse(JSON.stringify(payload));
        },
        SET_LAST_GEOCODING(state, payload) {
            state.lastGeocoding = JSON.parse(JSON.stringify(payload));
        },
        SET_FORMATTED_ADDRESS(state, payload) {
            state.formattedAddress = JSON.parse(JSON.stringify(payload));
        },
        SET_RADIUS(state, payload) {
            state.radius = payload;
        },
        SET_TRAVEL_MODE(state, payload) {
            state.travelMode = payload;
        },
        SET_SELFIE(state, payload) {
            state.selfie = payload;
        },

        /*createCode(state) {
            const min = 1001;
            const max = 9999;
            function randomInteger(min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                return Math.round(rand);
            }
            state.phone.value = randomInteger(min, max)
        },
        addPhone(state, phone) {
            state.phone.value = phone
        },
        checkPhoneCode(state, userCode) {
            if (state.code == userCode) state.phone.checked = true
        },*/
    },
    getters: {
        GET_LAST_LOCATION(state) {
            return state.lastLocation
        },
        GET_LAST_GEOCODING(state) {
            return state.lastGeocoding
        },
        GET_FORMATTED_ADDRESS(state) {
            return state.formattedAddress
        },
        GET_RADIUS(state) {
            return state.radius
        },
        GET_TRAVEL_MODE(state) {
            return state.travelMode
        },
        GET_SELFIE(state) {
            return state.selfie
        },
    },
}