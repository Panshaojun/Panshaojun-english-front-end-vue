import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import rootState from './types';
import word from './modules/word';
import study from './modules/study';
import thirdParty from './modules/thirdParty';
export const key: InjectionKey<Store<rootState>> = Symbol()

const store=createStore<rootState>({
  modules: {
    word,
    study,
    thirdParty
  }
})

store.dispatch("word/initWord");

export default store;