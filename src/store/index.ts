import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import rootState from './types';
import word from './modules/word';
import study from './modules/study';
import thirdParty from './modules/thirdParty';
import review from './modules/review';
import cache from './modules/cache';
export const key: InjectionKey<Store<rootState>> = Symbol()

const store=createStore<rootState>({
  modules: {
    word,
    study,
    thirdParty,
    review,
    cache
  }
})

store.dispatch("word/initWord");
store.dispatch("cache/init");

export default store;