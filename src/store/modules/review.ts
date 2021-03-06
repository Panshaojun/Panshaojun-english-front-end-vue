import { Module } from 'vuex';
import moment from 'moment';
import ReviewState from '../types/review';
import rootState from '../types';
import { findAll, ReviewView, } from '@/api/modules/model/reviewView';
import { changeDate } from '@/api/modules/model/reviewDate';
import { find as FindReviewWord, update as updateRviewWord, UpdateReviewWordModel,findMark } from '@/api/modules/model/reviewWord';
import to from 'await-to-js';


const index: Module<ReviewState, rootState> = {
    namespaced: true,
    state: {
        data: [],//所有复习情况
        reviewData: [], //某一天复习的数据
        markData:{},//今天该复习的数据
        tempMark:new Set()
    },
    mutations: {
        SET_data(state, data) {
            state.data = data;
        },
        SET_reviewData(state, data) {
            state.reviewData = data;
        },
        SET_markData(state,data){
            state.markData=data;
        },
        DEL_reviewData(state,index){
            if(index!==-1 && index < state.reviewData.length){
                state.reviewData.splice(index,1)
            }
        },
        SET_singleReviewData(state, payload) {
            const { id } = payload;
            const index = state.reviewData.findIndex(i => i.id === id);
            if (index !== -1) {
                // 居然可以根据索引替换了
                state.reviewData[index] = Object.assign(payload);
                // state.reviewData = [...state.reviewData];
            }
        }
    },
    getters: {
        // 指定艾宾浩斯周期，Ebbinghaus是周期数，day是指定日期
        // 根据指定日期 day 进行周期推算
        specifyDate:(state)=>(Ebbinghaus:number[],day= moment().format("Y-MM-DD"))=>{
            const ans: ReviewView[] = [];
            const reviewsDay: string[] = [];
            for (let i of Ebbinghaus) {
                const date = moment(day);
                reviewsDay.push(date.add(-i, "days").format('Y-MM-DD'));
            }
            for (let i of state.data) {
                for (let j of reviewsDay) {
                    if (i.date === j) {
                        ans.push(i);
                        break;
                    }
                }
            }
            return ans;
        }
    },
    actions: {
        freshData: async ({ commit }) => {
            const [, data] = await to(findAll());
            if (data) {
                commit("SET_data", data);
            }
        },
        freshReviewData: async ({ commit }, id) => {
            const [, data] = await to(FindReviewWord(id));
            if (data) {
                commit("SET_reviewData", data)
            }
        },
        freshMarkData: async ({ commit },rids) => {
            const [, data] = await to(findMark(rids));
            if (data) {
                commit("SET_reviewData", data)
            }
        },
        updateReviewData: async ({ commit }, playload: UpdateReviewWordModel) => {
            const [, res] = await to(updateRviewWord(playload));
            if (res) {
                commit("SET_singleReviewData", res);
                return true;
            }
            return false;
        },
        changeComment: async ({ dispatch }, playload: { id: number, comment: string }) => {
            return await dispatch("updateReviewData", playload);
        },
        changeMark: async ({ dispatch }, playload: { id: number, mark: string }) => {
            return await dispatch("updateReviewData", playload);
        },
        changeDate: async ({ dispatch }, playload: { id: number, date: string }) => {
            const { id, date } = playload;
            const [, res] = await to(changeDate(id, date));
            if (res) {
                dispatch("freshData");
                return true;
            } else {
                return false;
            }
        }
    }
}

export default index;