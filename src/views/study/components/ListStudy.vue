<template>
  <slot name="btn" :closeVisible="() => (visible = true)"></slot>
  <a-drawer
    title="准备学习"
    width="800"
    placement="right"
    :closable="false"
    v-model:visible="visible"
  >
    <div v-for="i of data">
      <span>
        <a-button @click="cancel(i.id)">取消</a-button>
        <a-button @click="editComment(i)">笔记</a-button>
      </span>
      <span>{{ i.w }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ i.comment }}</span>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { StudyData } from "@/store/types/study";

let visible = ref(false);

const emits=defineEmits(["editComment"]);
const editComment=(word:StudyData)=>emits("editComment",word);

const store = useStore(key);
const data = computed(() => store.state.study.studyData);
const cancel = (id: number) => store.dispatch("study/delStudy", id);

</script>
