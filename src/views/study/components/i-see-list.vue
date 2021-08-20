<template>
    <a-drawer
    title="Basic Drawer"
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import ThirdParty from "@/components/third-party/index.vue";
  import { useStore } from "vuex";
  import { key } from "@/store";
  
  const store = useStore(key);
  const showData = computed(() => store.state.study.showData);
  const showIndex = ref<number>(-1);
  
  store.dispatch("study/initShowStartIndex");
  const add = () => store.dispatch("study/addShowLength", 10);
  const iSee = (id: number) => store.dispatch("study/addDeleted", id);
  const iStudy = (id: number) => store.dispatch("study/addStudy", id);
  const cancel_iSee = (id: number) => store.dispatch("study/delDeleted", id);
  const cancel_iStudy = (id: number) => store.dispatch("study/delStudy", id);
  
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
        break;
      case "ArrowRight":
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
  