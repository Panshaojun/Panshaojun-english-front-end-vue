<template>
  <div class="review">
    <div class="review__list">
      <div>
        <p>w上翻，s下翻</p>
      </div>
      <ul>
        <li
          v-for="(i, index) of reviewData"
          :key="i.id"
          :class="i.id === wordId && 'review__list-active'"
        >
          {{ dataInfo(i.id) }}
          <a-divider v-if="(index+1) % 10 ===0" />
        </li>
      </ul>
    </div>
    <div class="review__word-info">
      <ThirdParty :wordId="wordId"></ThirdParty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import ThirdParty from "@/components/third-party/index.vue";
const store = useStore(key);
const data = store.state.word.data;
const dataInfo = (id: number) => {
  const index = data.findIndex((i) => i.id === id);
  return index === -1 ? "找不到数据" : data[index].w;
};
const reviewData = store.state.review.reviewData;
const reviewIndex = ref<number>(-1); //当前 reviewData 中被展示的数组下标
const wordId = computed(() => {
  const word = reviewData[reviewIndex.value];
  return word ? word.id : -1;
});
const browseShowWord: (direction: 1 | -1) => void = (direction) => {
  if (!reviewData.length) {
    return;
  }
  if (reviewIndex.value === -1) {
    return (reviewIndex.value = 0);
  }
  if (direction === -1 && reviewIndex.value === 0) {
    return;
  }
  if (direction === 1 && reviewIndex.value === reviewData.length - 1) {
    return;
  }
  reviewIndex.value += direction;
};
document.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      break;
    case "ArrowRight":
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
</script>

<style lang="scss">
.review {
  display: flex;
  .review__list {
    padding: 20px 0 20px 20px;
    flex: 0 0 200px;
    ul{
      list-style: none;
    }
    .review__list-active {
      color: red;
    }
  }
  .review__word-info {
  }
}
</style>
