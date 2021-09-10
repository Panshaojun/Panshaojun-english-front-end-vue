import { Module } from 'vuex';
import CacheState from '../types/cache';
import rootState from '../types';
import to from 'await-to-js';
import { fetchAudio } from '@/api/modules/upload/aduio';

const index: Module<CacheState, rootState> = {
    namespaced: true,
    state: {
        audio: {}
    },
    mutations: {
        SET_audio(state, { id, url }) {
            state.audio[id] = url;
        },
    },
    actions: {
        getAudio: async ({ state, dispatch }, { id, url }) => {
            const audioUrl = state.audio[id];
            if (audioUrl) {
                return audioUrl;
            } else {
                return await dispatch("findAudio", { id, url })
            }
        },
        findAudio: async ({ commit }, { id, url }) => {
            const [, audioUrl] = await to(fetchAudio(url));
            if (audioUrl) {
                commit("SET_audio", audioUrl);
                return audioUrl;
            } else {
                return null;
            }
        }
    }
}

export default index;