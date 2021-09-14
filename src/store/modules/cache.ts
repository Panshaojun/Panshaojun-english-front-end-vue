import { Module } from 'vuex';
import CacheState from '../types/cache';
import rootState from '../types';
import to from 'await-to-js';
import { fetchAudio } from '@/api/modules/upload/aduio';
import {findAll as findAllAudio} from '@/api/modules/model/audioFile';

const index: Module<CacheState, rootState> = {
    namespaced: true,
    state: {
        audio: {}
    },
    mutations: {
        SET_audio(state,audio){
            state.audio=audio;
        },
        SET_singleAudio(state, { id, url }) {
            state.audio[id] = url;
        },
    },
    actions: {
        init({dispatch}){
            dispatch("initAudio");
        },
        initAudio:async({commit})=>{
            const [,data]=await to(findAllAudio());
            if(data){
                const audios:{
                    [key in number]:string
                }={};
                data.map(i=>audios[i.id]=i.path);
                commit("SET_audio",audios);
                console.log("初始化音频文件成功！");
            }else{
                console.info("初始化音频文件失败！");
            }
        },
        getAudio: async ({ state, commit }, { id, url }) => {
            const audioUrl = state.audio[id];
            if (audioUrl) {
                return audioUrl;
            } else {
                const [, serverAudioUrl] = await to(fetchAudio(id,url));
                if (serverAudioUrl) {
                    commit("SET_singleAudio", {id,url:serverAudioUrl});
                }
                return serverAudioUrl;
            }
        }
    }
}

export default index;