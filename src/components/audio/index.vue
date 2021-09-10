<template>
  <span class="c-audio">
    <span v-if="audioUrl">
      播放
      <audio loop>
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
store.dispatch("cache/getAudio", props.aduio).then((res) => {
  if (res) {
    audioUrl.value = res;
  }
});
</script>

<style lang="scss"></style>
