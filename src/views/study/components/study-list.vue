<template>
  <slot name="btn" :closeVisible="() => (visible = true)"></slot>
  <a-drawer
    title="准备学习"
    placement="right"
    :closable="false"
    v-model:visible="visible"
  >
    <div v-for="i of data">
      <a-button @click="cancel(i.id)">取消</a-button>&nbsp;&nbsp; {{ i.w }}
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

const store = useStore(key);
const data = computed(() => store.state.study.studyData);
let visible = ref(false);
const cancel = (id: number) => store.dispatch("study/delStudy", id);
</script>
