<template>
  <p class="c-audio" @mouseleave="pauseAudio()">
    <span v-if="audioUrl">
      <span @mouseenter="playAudio()">播放发音</span>
      <audio loop ref="audioDom" :src="audioUrl" :key="audioUrl"></audio>
    </span>
    <span v-else>没有音频</span>
  </p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const props = defineProps<{
  audio: {
    id: number;
    url: string;
  };
}>();
const audioUrl = ref("");
const audioDom = ref<HTMLAudioElement>();
store.dispatch("cache/getAudio", props.audio).then((url) => {
  if (url) {
    audioUrl.value = url;
  }
});
const playAudio = () => {
  if (audioDom.value) {
    audioDom.value.currentTime = 0;
    audioDom.value.play();
  }
};
const pauseAudio = () => {
  if (audioDom.value) {
    audioDom.value.pause();
  }
};
</script>

<style lang="scss">
.c-audio{
  cursor: pointer;
}
</style>
