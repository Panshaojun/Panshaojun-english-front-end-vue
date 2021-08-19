import { Module } from 'vuex';
import WordState from '../types/word';
import rootState from '../types';
import {findAll} from '@/api/modules/model/word';

const index:Module<WordState,rootState>={
    namespaced:true,
    state:{
        word:[]
    },
    mutations:{
        SET_word(state, word) {
            state.word = word;
        },
    },
    actions:{
        initWord:async ({commit,dispatch})=>{
            const data = localStorage.getItem('data') || false;
            if(data){
                console.log("本地获取了word数据！");
                commit("SET_word",data);
            }else{
                const result=await dispatch("freshWord");
                if(!result){
                    console.warn("word数据初始化失败！")
                }
            }
        },
        freshWord:({commit})=>new Promise((resolve)=>{
            findAll().then(res=>{
                if(res){
                    console.log("服务器获取了word数据！");
                    commit("SET_word",res);
                    resolve(true);
                }else{
                    console.log("服务器获取的word数据有错误");
                    resolve(false);
                }
            }).catch(()=>resolve(false));
        })
    }
}

export default index;