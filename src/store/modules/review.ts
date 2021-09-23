import { Module } from 'vuex';
import moment from 'moment';
import ReviewState from '../types/review';
import rootState from '../types';
import { findAll, ReviewView, } from '@/api/modules/model/reviewView';
import { changeDate } from '@/api/modules/model/reviewDate';
import { find as FindReviewWord, update as updateRviewWord, UpdateReviewWordModel } from '@/api/modules/model/reviewWord';
import to from 'await-to-js';


const index: Module<ReviewState, rootState> = {
    namespaced: true,
    state: {
        data: [],//所有复习情况
        reviewData: [], //某一天复习的数据
    },
    mutations: {
        SET_data(state, data) {
            state.data = data;
        },
        SET_reviewData(state, data) {
            state.reviewData = data;
        },
        SET_singleReviewData(state, payload) {
            const { id } = payload;
            const index = state.reviewData.findIndex(i => i.id === id);
            if (index !== -1) {
                if (payload.mark) {
                    payload.mark = JSON.parse(payload.mark)
                }
                state.reviewData[index] = Object.assign(payload);
                state.reviewData = [...state.reviewData];
            }
        }
    },
    getters: {
        tommarow: (state) => {
            const ans: ReviewView[] = [];
            const tommarowDate = moment().add(1, "days").format('Y-MM-DD');
            for (let i of state.data) {
                if (i.date === tommarowDate) {
                    ans.push(i);
                    break;
                }
            }
            return ans;
        },
        day: (state) => (day: string = moment().format("Y-MM-DD")) => {
            const ans: ReviewView[] = [];
            let Ebbinghaus = [0, 1, 2, 4, 7, 15];
            let reviewsDay: string[] = [];
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