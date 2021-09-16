<template>
  <a-modal
    v-model:visible="modal.visible"
    :title="modal.title"
    @ok="completed()"
    @cancel="() => setEditStatus(false)"
  >
    <a-input v-model:value="modal.comment"></a-input>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { StudyData } from "@/store/types/study";
import { useStore } from "vuex";
import { key } from "@/store";

const props = defineProps<{
  targetWord: StudyData | null;
}>();
const store = useStore(key);
const modal = reactive<{
  visible: boolean;
  title: string;
  comment: string;
}>({
  visible: false,
  title: "",
  comment: "",
});
const setEditStatus = (status: boolean) => {
  store.commit("study/SET_editting", status);
};
watch(
  () => props.targetWord,
  (newVal) => {
    if (newVal) {
      setEditStatus(true);
      modal.comment = newVal.comment;
      modal.title = `为单词【${newVal.w}】编写笔记`;
      modal.visible = true;
    } else {
      modal.visible = false;
    }
  }
);
const completed = () => {
  if (props.targetWord) {
    store.commit("study/SET_comment", {
      id: props.targetWord.id,
      comment: modal.comment,
    });
  }
  store.commit("study/SET_editting", false);
  modal.visible = false;
};
</script>
