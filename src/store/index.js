/*import Vue from 'vue'
import Vuex from 'vuex'
import userPhone from './modules/userPhone'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({*/
import { createStore } from 'vuex';
import registration from './modules/registration.js';
import settings from './modules/settings.js';
//import appConfiguration from './modules/appConfiguration.js';
////import { setItem, getItem} from '@/scripts/Storage';
import * as Storage from '@/scripts/Storage';
//import Storage from '../scripts/Storage.js';
const store = createStore({
    modules: {
        registration,
        settings,
        //appConfiguration
    },
    state: {
        state: null,
        lastMsg: null,
        registrationStage: null //documentChecked ||
    },
    actions: {
        async SET_REGISTRATION_STAGE(context, body) {
             await context.commit('SET_REGISTRATION_STAGE', body);
             await Storage.setItem('registrationStage', body);
        },
        async getJSON(context, url) {
            try {
                const res = await fetch(url);
                const data = await res.json();
                context.commit('updateLstMsg', data)
            } catch (e) {
                console.error(e)
            } finally {
                console.log(`JSON is gotten from ${url}`);
            }
        },
        async sendJSON(context, body) {
            const url = body.url;

            console.log(body)
            const headers = {
                'Content-Type': 'application/json;charset=utf-8'
            };
            const method = 'POST';
            try {
                await fetch(url, {
                method: method,
                body: JSON.stringify(body.message),
                headers: headers
                })
            } catch (e) {
                console.error(e)
            } finally {
                console.log(`JSON is successfully sent to ${url}`)
            }
        }
    },
    mutations: {
        SET_REGISTRATION_STAGE(state, data){
            state.registrationStage = Object.assign(state.registrationStage, data);
        },
        updateData(state, data) {
            console.log(data);
            state = Object.assign(state, data);
            console.log(state);
        },
        updateLstMsg(state, data) {
            state.lastMsg = {}
            state.lastMsg = JSON.parse(JSON.stringify(data));
        }
    },
    getters: {
        GET_REGISTRATION_STAGE(state) { //registrationStage
            if (state.registrationStage) {
                return state.registrationStage
            } else {
                return Storage.getItem('registrationStage')
            }
        },
        GET_INDEX_STATE(state) {
            return state
        }
    }
})

export default store;