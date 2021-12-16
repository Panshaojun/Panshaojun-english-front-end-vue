<template>
  <div class="review">
    <div class="review-list">
      <ReviewList @idChange="changeWordId" />
    </div>
    <div class="review-wordInfo" ref="wordShowDom">
      <ThirdParty :wordId="wordId"></ThirdParty>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewList from "./components/List.vue";
import ThirdParty from "@/components/third-party/index.vue";
import { ref } from "vue";


const wordId = ref(-1);
const wordShowDom = ref<HTMLDivElement>();
const changeWordId = (id: number) => {
  if (wordShowDom.value) {
    wordShowDom.value.scrollTop = 0;
  }
  wordId.value = id;
};
</script>

<style lang="scss">
kbd {
  cursor: pointer;
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
.review {
  display: flex;
  height: calc(100vh - 50px);
  width: 100vw;
  position: relative;
  .review-list {
    flex: 0 0 200px;
  }
  .review-wordInfo {
    flex: 1;
    height: 100%;
    overflow: auto;
    padding: 20px 0 20px 10px;
  }
}
</style>
