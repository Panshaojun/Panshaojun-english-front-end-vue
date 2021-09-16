<template>
  <a-row>
    <a-col :span="24">
      <a-divider />
      <ListKnow>
        <template #btn="{ closeVisible }">
          <a-button @click="closeVisible">我认识</a-button>
        </template>
      </ListKnow>
      <a-button @click="add()">增加10个</a-button>

      <a-date-picker v-model:value="date" />
      <a-button @click="save">保存单词</a-button>
      <ListStudy @edit-comment="handleEidt">
        <template #btn="{ closeVisible }">
          <a-button @click="closeVisible">准备学习{{ studyLength }}</a-button>
        </template>
      </ListStudy>
      <a-divider />
      <!-- <p>认识<kbd>←</kbd><kbd>→</kbd>学习</p>
      <p>上翻<kbd>↑</kbd><kbd>↓</kbd>下翻</p> -->
    </a-col>
  </a-row>
  <ListShow @edit-comment="handleEidt"/>
  <EditComment :targetWord="targetWord" />
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import EditComment from "./components/EditComment.vue";
import ListStudy from "./components/ListStudy.vue";
import ListKnow from "./components/ListKnow.vue";
import ListShow from "./components/ListShow.vue";
import { StudyData } from "@/store/types/study";

const store = useStore(key);
const date = ref(moment());
const save = () =>
  store.dispatch("study/saveStudy", date.value.format("Y-MM-DD"));
const add = () => store.dispatch("study/addShowLength", 10);
const studyLength = computed(() => store.state.study.studyData.length);

const targetWord = ref<StudyData | null>(null);
const handleEidt=(word:StudyData)=>{
  targetWord.value=null;
  targetWord.value=word;
};
</script>

<style lang="scss">
kbd {
  background: linear-gradient(180deg, #f4f4f4, #d5d5d5);
  background-color: #f4f4f4;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  box-shadow: 0 1px 2px 1px #d5d5d5;
  font-family: consolas, "Liberation Mono", courier, monospace;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  margin: 3px;
  padding: 4px 6px;
  white-space: nowrap;
}
.study__word-active {
  color: red;
}
.study__third-party {
  height: calc(100vh - 55px);
  width: calc(100vw - 450px);
  overflow: auto;
}
</style>
