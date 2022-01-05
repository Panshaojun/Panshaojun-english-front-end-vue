<template>
  <div class="review-c-list">
    <div class="comment-box">
      <ListComment
        v-if="reviewIndex !== -1"
        :data="reviewData[reviewIndex]"
        v-model:editting="commentEditing"
      />
    </div>
    <ul class="li">
      <li
        v-for="(i, index) of reviewData"
        :key="i.id"
        :class="[index === reviewIndex && 'review__list-active']"
        @click="() => setReviewIndex(index)"
      >
        <p class="li-p">
          <span>{{ dataInfo(i.id) }}</span>
          <span @click="WordToNewDay(i.id,index)">
            <CarryOutOutlined />
          </span>
        </p>
        <a-divider v-if="(index + 1) % 10 === 0" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { computed, ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { message } from "ant-design-vue";
import ListComment from "./ListComment.vue";
import { CarryOutOutlined } from "@ant-design/icons-vue";
import { updateReviewWord } from "@/api/modules/db/index";

const store = useStore(key);
const data = store.state.word.data;
const emits = defineEmits(["idChange"]);

const dataInfo = (id: number) => {
  const index = data.findIndex((i) => i.id === id);
  return index === -1 ? "找不到数据" : data[index].w;
};

const reviewData = computed(() => store.state.review.reviewData);
const reviewIndex = ref<number>(-1); //当前 reviewData 中被展示的数组下标
const setReviewIndex = (index: number) => {
  index=reviewData.value.length>index?index:(reviewData.value.length-1);
  const currentData = reviewData.value[index];
  emits("idChange", currentData.id); // 用作联动右边的
  reviewIndex.value = index;
};

const tempMark = ref<Set<number>>(new Set([]));
const isTempMark = (id: number) => {
  return tempMark.value.has(id);
};

const WordToNewDay = async (id: number,index:number) => {
  const date = moment().add(1,"days").format("Y-MM-DD");
  const res = await updateReviewWord(id, date);
  if (res) {
    store.commit("review/DEL_reviewData",index);
    setReviewIndex(index);
    message.success("添加该单词进入新一轮艾宾浩斯成功！");
  } else {
    message.warn("添加该单词进入新一轮艾宾浩斯失败！");
  }
};

const handleClick = async () => {
  if (reviewIndex.value === -1) {
    return;
  }
  const data = reviewData.value[reviewIndex.value];
  // 正常复习模式
  WordToNewDay(data.id,reviewIndex.value);
};

//  键盘事件
const browseShowWord: (direction: 1 | -1) => void = (direction) => {
  if (!reviewData.value.length) {
    return;
  }
  if (reviewIndex.value === -1) {
    return setReviewIndex(0);
  }
  if (direction === -1 && reviewIndex.value === 0) {
    return;
  }
  if (direction === 1 && reviewIndex.value === reviewData.value.length - 1) {
    return;
  }
  setReviewIndex(reviewIndex.value + direction);
};
const commentEditing = ref(false);
onMounted(() => {
  document.onkeydown = (e) => {
    const key = e.key.toLowerCase();
    if (commentEditing.value) {
      return;
    }
    switch (key) {
      case "w":
        browseShowWord(-1);
        break;
      case "s":
        browseShowWord(1);
        break;
      case " ":
        handleClick();
        break;
      case "Enter":
        break;
      case "Backspace":
        break;
      default:
    }
    e.preventDefault();
  };
});
onUnmounted(() => (document.onkeydown = null));
</script>

<style lang="scss">
.review-c-list {
  padding: 0 0 20px 0;
  height: 100%;
  overflow: auto;
  position: relative;
  .mark {
    font-weight: bold;
    color: black;
    border-radius: 5px;
    background-color: raba(0, 0, 0, 0.7);
  }
  .li-p {
    line-height: 15px;
    font-weight: bold;
    > span:nth-child(2) {
      margin-left: 5px;
    }
    > span:last-child {
      float: right;
      margin-right: 10px;
      > span:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
  .comment-box {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 120px;
    background-color: #f0f2f5;
    border: solid 2px #dee1e6;
    border-top: none;
    border-left: none;
  }
  ul {
    padding: 20px 10px;
    list-style: none;
    border: solid 2px #dee1e6;
    border-top: none;
    border-bottom: none;
    li {
      cursor: pointer;
    }
  }
  .review__list-active {
    padding: 0 0 0 4px;
    color: #3174b2;
  }
  .review__list-mark {
    color: red;
  }
}
</style>
