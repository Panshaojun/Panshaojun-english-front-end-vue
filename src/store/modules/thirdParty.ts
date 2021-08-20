import { Module } from 'vuex';
import ThirdPartyState from '../types/third-party';
import rootState from '../types';
import to from 'await-to-js';
import { findByArray } from '@/api/modules/model/wordView';

const index: Module<ThirdPartyState, rootState> = {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_data(state, data) {
            state.data = data;
        },
    },
    actions: {
        getData: async ({ commit, state }, id) => {
            const findIndex = state.data.findIndex(i => i.id === id);
            if (findIndex !== -1) {
                return state.data[findIndex];
            } else {
                const [err, data] = await to(findByArray([id]));
                if (err) {
                    console.warn(`获取第三方数据失败了额,id${id}，错误是：`, err);
                    return null;
                } else {
                    if (data) {
                        commit("SET_data", [...state.data, data[0]]);
                        return data[0];
                    } else {
                        return null;
                    }
                }
            }
        },
        fixBing: async ({ commit, state }, id) => {
            
        },
        fixVocabulary: async ({ commit, state }, id) => {
            
        },
    }
}

export default index;