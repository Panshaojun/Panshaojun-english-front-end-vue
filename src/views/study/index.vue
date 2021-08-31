<template>
    <a-row>
      <a-col :span="24">
        <ISeeList>
          <template #btn="{ closeVisible }">
            <a-button @click="closeVisible">我认识</a-button>
          </template>
        </ISeeList>
        <StudyList>
          <template #btn="{ closeVisible }">
            <a-button @click="closeVisible">在学习</a-button>
          </template>
        </StudyList>
        <a-date-picker v-model:value="date" />
        <a-button @click="save">保存单词</a-button>
        <a-divider />
        <p>认识<kbd>←</kbd><kbd>→</kbd>学习</p>
        <p>上翻<kbd>↑</kbd><kbd>↓</kbd>下翻</p>
      </a-col>
      <a-col :span="4">
        <ol>
          <li
            v-for="(i, index) of store.state.study.showData"
            :class="[index === showIndex ? 'study__word-active' : '']"
            @click="showIndex = index"
          >
            {{ i.id }}.{{ i.w }}
          </li>
        </ol>
      </a-col>
      <a-col :span="20" v-if="showIndex !== -1" class="study__third-party">
        <ThirdParty :wordId="showData[showIndex].id" />
      </a-col>
    </a-row>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed } from "vue";
import ThirdParty from "@/components/third-party/index.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import StudyList from "./components/study-list.vue";
import ISeeList from "./components/i-see-list.vue";
const store = useStore(key);
const showData = computed(() => store.state.study.showData);
const showIndex = ref<number>(-1);
const date=ref(moment().format("Y-MM-DD"));
store.dispatch("study/initShowStartIndex");
const add = () => store.dispatch("study/addShowLength", 10);
const save = () =>
  store.dispatch("study/saveStudy", date.value);
const iSee = () =>
  store.dispatch("study/addDeleted", showData.value[showIndex.value].id);
const Study = () =>
  store.dispatch("study/addStudy", showData.value[showIndex.value].id);

//键盘控制浏览展示数据！
const browseShowWord: (direction: 1 | -1) => void = (direction) => {
  if (!showData.value.length) {
    return;
  }
  if (showIndex.value === -1) {
    return (showIndex.value = 0);
  }
  if (direction === -1 && showIndex.value === 0) {
    return;
  }
  if (direction === 1 && showIndex.value === showData.value.length - 1) {
    return;
  }
  showIndex.value += direction;
};
document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      iSee();
      break;
    case "ArrowRight":
      Study();
      break;
    case "ArrowUp":
      browseShowWord(-1);
      break;
    case "ArrowDown":
      browseShowWord(1);
      break;
    case "Enter":
      break;
    case "Backspace":
      break;
    default:
  }
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
