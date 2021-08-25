import { Module } from 'vuex';
import to from 'await-to-js';
import StudyState from '../types/study';
import rootState from '../types';
import { getMaxReviewId,saveStudy } from '@/api/modules/db/index';
const index: Module<StudyState, rootState> = {
    namespaced: true,
    state: {
        __showStartIndex: 0,
        __showLength: 0,
        showData: [],
        studyData: [],
        deletedData: []
    },
    mutations: {
        SET_showStartIndex(state, index) {
            state.__showStartIndex = index;
        },
        SET_showLength(state, len) {
            state.__showLength = len;
        },
        SET_showData(state, showData) {
            state.showData = showData;
        },
        SET_studyData(state, studyData) {
            state.studyData = studyData;
        },
        SET_deletedData(state, deletedData) {
            state.deletedData = deletedData;
        },
    },
    actions: {
        initShowStartIndex: async ({ commit, rootState, dispatch }) => {
            let [err, maxId] = await to(getMaxReviewId());
            if (err) {
                return alert("获取学习数组下标失败！！");
            }
            if (maxId) {
                const startIndex = rootState.word.data.findIndex(i => i.id === maxId);
                if (startIndex !== -1) {
                    commit("SET_showStartIndex", startIndex + 1);
                } else {
                    return alert("复习最大 id 在本地数据中不存在，刷新本地数据或者检查数据库");
                }
            } else {
                commit("SET_showStartIndex", 0);
            }
            dispatch("addShowLength", 20)
        },
        addShowLength: async ({ commit, state, rootState }, len) => {
            if (len < 0) {
                return;
            }
            const startIndex = state.__showStartIndex + state.__showLength;
            const endIndex = startIndex + len;
            const additionalData = rootState.word.data.slice(startIndex, endIndex);
            const data = [...state.showData, ...additionalData];
            commit("SET_showLength", state.__showLength + len);
            commit("SET_showData", data);
        },
        //添加学习单词
        addStudy: async ({ commit, state }, id) => {
            const index = state.showData.findIndex(i => i.id === id);
            if (index !== -1) {
                const temp = [...state.studyData, state.showData[index]];
                temp.sort((a, b) => a.id - b.id);
                commit("SET_studyData", temp);
                const temp2 = [...state.showData];
                temp2.splice(index, 1);
                commit("SET_showData", temp2);
            }
        },
        //删除学习单词
        delStudy: async ({ commit, state }, id) => {
            const index = state.studyData.findIndex(i => i.id === id);
            if (index !== -1) {
                const temp = [...state.showData, state.studyData[index]];
                temp.sort((a, b) => a.id - b.id);
                commit("SET_showData", temp);
                const temp2 = [...state.studyData];
                temp2.splice(index, 1);
                commit("SET_studyData", temp2);
            }
        },
        //添加已经认识单词
        addDeleted: async ({ commit, state }, id) => {
            const index = state.showData.findIndex(i => i.id === id);
            if (index !== -1) {
                const temp = [...state.deletedData, state.showData[index]];
                temp.sort((a, b) => a.id - b.id);
                commit("SET_deletedData", temp);
                const temp2 = [...state.showData];
                temp2.splice(index, 1);
                commit("SET_showData", temp2);
            }
        },
        //删除已经认识单词
        delDeleted: async ({ commit, state }, id) => {
            const index = state.deletedData.findIndex(i => i.id === id);
            if (index !== -1) {
                const temp = [...state.showData, state.deletedData[index]];
                temp.sort((a, b) => a.id - b.id);
                commit("SET_showData", temp);
                const temp2 = [...state.deletedData];
                temp2.splice(index, 1);
                commit("SET_deletedData", temp2);
            }
        },
        saveStudy: async ({ state }, date) => {
            const studyData=state.studyData;
            const data=studyData.map(i=>{
                return {
                    id:i.id,
                    rid:0,
                    mark:"",
                    comment:"",
                }
            })
            const [err]= await to(saveStudy(date,data));
            if(err){
                alert(err)
            }else{
                
            }
        },
    }
}

export default index;