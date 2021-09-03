import { Module } from 'vuex';
import moment from 'moment';
import ReviewState from '../types/review';
import rootState from '../types';
import { findAll, ReviewView } from '@/api/modules/model/reviewView';
import { find as FindReviewWord} from '@/api/modules/model/reviewWord';
import to from 'await-to-js';


const index: Module<ReviewState, rootState> = {
    namespaced: true,
    state: {
        data: [],//所有复习情况
        reviewData:[], //某一天复习的数据
    },
    mutations: {
        SET_data(state, data) {
            state.data = data;
        },
        SET_reviewData(state,data){
            state.reviewData=data;
        }
    },
    getters: {
        day: (state) => (day: string = moment().format("Y-MM-DD")) => {
            const ans: ReviewView[] = [];
            let Ebbinghaus = [0, 1, 2, 4, 7, 15];
            let reviewsDay: string[] = [];
            for (let i of Ebbinghaus) {
                const date= moment(day);
                reviewsDay.push(date.add(-i,"days").format('Y-MM-DD'));
            }
            for(let i of state.data){
                for(let j of reviewsDay){
                    if(i.date===j){
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
        freshReviewData:async({commit},id)=>{
            const [,data]=await to(FindReviewWord(id));
            if(data){
                commit("SET_reviewData",data)
            }
        }
    }
}

export default index;