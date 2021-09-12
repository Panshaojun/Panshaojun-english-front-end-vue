<template>
  <span class="c-audio" @mouseleave="pauseAudio()">
    <span v-if="audioUrl">
      <span @click="playAudio()">播放</span>
      <audio loop :ref="audioDom">
        <source :src="audioUrl" type="audio/mp3" />
      </audio>
    </span>
    <span v-else>没有音频</span>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const props = defineProps<{
  aduio: {
    id: number;
    url: string;
  };
}>();
const audioUrl = ref("");
const audioDom=ref<HTMLAudioElement>();
store.dispatch("cache/getAudio", props.aduio).then((res) => {
  if (res) {
    audioUrl.value = res;
  }
});
const playAudio=()=>{
  if(audioDom.value){
    audioDom.value.currentTime=0;
    audioDom.value.play();
  }
}
const pauseAudio=()=>{
  if(audioDom.value){
    audioDom.value.pause();
  }
}
</script>

<style lang="scss"></style>
