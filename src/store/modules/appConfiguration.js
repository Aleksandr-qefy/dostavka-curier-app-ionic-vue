////import { setItem, getItem} from '../../scripts/Storage.js';
import * as Storage from '@/scripts/Storage';

export default {
    state: {
        mapStyle: null,
    },
    actions: {
        async SET_MAP_STYLE(context, style) {
          await Storage.setItem('mapStyle', style);
          await context.commit('SET_MAP_STYLE', style);
        }
    },
    mutations: {
        SET_MAP_STYLE(state, payload) {
          state.mapStyle = payload;
        }
    },
    getters: {
        async GET_MAP_STYLE(state) {

          if (state.mapStyle == null) {
            const mapStyle =  await Storage.getItem('mapStyle');
            if (mapStyle) {
              state.commit('SET_MAP_STYLE', mapStyle);
            } else {
              state.dispatch('SET_MAP_STYLE', 'default');
              return 'default';
            }
          }
          //else if (state.mapStyle) {
              //return state.mapStyle;
          //}
          else {
            //state.dispatch('SET_MAP_STYLE', 'default');
            //return 'default'
            return state.mapStyle;
          }
        }
    }
}