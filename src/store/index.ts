import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import rootState from './types';
import word from './modules/word';

export const key: InjectionKey<Store<rootState>> = Symbol()

const store=createStore<rootState>({
  modules: {
    word
  }
})

store.dispatch("word/initWord");

export default store;