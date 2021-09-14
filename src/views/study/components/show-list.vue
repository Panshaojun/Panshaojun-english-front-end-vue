<template>
  <a-row>
    <a-col :span="4">
      <ul class="study__word-list">
        <li
          v-for="(i, index) of store.state.study.showData"
          :class="[index === showIndex ? 'study__word-active' : '']"
          class="li"
        >
          {{ i.id }}
          <span @click="showIndex = index">
            {{ i.w }}
          </span>
          <span class="edit-comment" @click.capture="openModal(i)">
            <EditOutlined />
          </span>
          <span class="comment">
            {{ i.comment }}
          </span>
        </li>
      </ul>
    </a-col>
    <a-col :span="20" class="study__third-party">
      <ThirdParty :wordId="wordId" />
    </a-col>
  </a-row>

  <a-modal
    v-model:visible="modal.visible"
    title="添加笔记，只有学习才能被记录"
    @ok="modal.visible = false"
  >
    <a-input v-if="modal.word" v-model:value="modal.word.comment"></a-input>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onUnmounted } from "vue";
import ThirdParty from "@/components/third-party/index.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { EditOutlined } from "@ant-design/icons-vue";
import { StudyData } from "@/store/types/study";
const store = useStore(key);
const showData = computed(() => store.state.study.showData);
const modal = reactive<{
  visible: boolean;
  word: StudyData | null;
}>({
  visible: false,
  word: null,
});
const openModal = (word: StudyData) => {
  modal.word = word;
  modal.visible = true;
};

const showIndex = ref<number>(-1); //当前 showData 中被展示的数组下标
const wordId = computed(() => {
  const word = showData.value[showIndex.value];
  return word ? word.id : -1;
});
store.dispatch("study/initShowStartIndex");

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
  if (modal.visible) {
    return;
  }
  switch (e.key) {
    case "a":
      iSee();
      break;
    case "d":
      Study();
      break;
    case "w":
      browseShowWord(-1);
      break;
    case "s":
      browseShowWord(1);
      break;
    case "Enter":
      break;
    case "Backspace":
      break;
    default:
  }
};
onUnmounted(() => (document.onkeydown = null));
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
.study__word-list {
  padding-left: 20px;
  list-style: none;
  .li {
    &:hover .comment,
    &:hover .edit-comment {
      opacity: 1;
    }
    .comment,
    .edit-comment {
      margin-left: 10px;
      cursor: pointer;
      opacity: 0;
    }
  }
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
