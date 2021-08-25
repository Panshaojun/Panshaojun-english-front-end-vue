<template>
  <slot name="btn" :closeVisible="() => (visible = true)"></slot>
  <a-drawer
    title="我认识的"
    placement="left"
    :closable="false"
    v-model:visible="visible"
  >
    <div v-for="i of data" style="text-align: right">
      {{ i.w }}&nbsp;&nbsp; <a-button @click="cancel(i.id)">取消</a-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

const store = useStore(key);
const data = computed(() => store.state.study.deletedData);
const visible = ref(false);
const cancel = (id: number) => store.dispatch("study/delDeleted", id);
</script>
