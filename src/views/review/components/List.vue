<template>
  <div class="opt">
    <p>
      <kbd @click="browseShowWord(-1)">a</kbd>
      <kbd @click="browseShowWord(1)">s</kbd>
      <kbd @click="browseShowWord(1)">space</kbd>
    </p>
    <p v-if="reviewIndex !== -1">
      {{ reviewData[reviewIndex].comment }}
      <span class="edit-comment" @click.capture="openUpdateModal(reviewIndex)">
        <EditOutlined />
      </span>
    </p>
  </div>
  <ul>
    <li
      v-for="(i, index) of reviewData"
      :key="i.id"
      :class="index === reviewIndex && 'review__list-active'"
      @click="() => setReviewIndex(index)"
    >
      <p class="li-p">
        <span :style="i.mark">{{ dataInfo(i.id) }}</span>
        <span v-if="i.mark" @click.capture="toMark(index, false)">
          <HeartFilled />
        </span>
        <span v-else @click.capture="toMark(index, true)">
          <HeartOutlined />
        </span>
      </p>
      <a-divider v-if="(index + 1) % 10 === 0" />
    </li>
  </ul>
  <a-modal
    v-model:visible="updateModal.visible"
    :title="updateModal.title"
    @ok="saveUpdate"
  >
    <a-input v-model:value="updateModal.data.comment"></a-input>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onUnmounted } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const data = store.state.word.data;
const emits = defineEmits(["idChange"]);
import {
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import to from "await-to-js";
const dataInfo = (id: number) => {
  const index = data.findIndex((i) => i.id === id);
  return index === -1 ? "找不到数据" : data[index].w;
};
const reviewData = computed(() => store.state.review.reviewData);
const reviewIndex = ref<number>(-1); //当前 reviewData 中被展示的数组下标
const setReviewIndex = (index: number) => {
  const currentData = reviewData.value[index];
  emits("idChange", currentData.id);
  reviewIndex.value = index;
};

//更新
const updateModal = reactive({
  visible: false,
  title: "",
  data: {
    id: 0,
    comment: "",
  },
});
const openUpdateModal = (index: number) => {
  const currentData = reviewData.value[index];
  updateModal.title = `更改 「${dataInfo(currentData.id)}」 笔记`;
  updateModal.data.id = currentData.id;
  updateModal.data.comment = currentData.comment;
  updateModal.visible = true;
};
const toMark = async (index: number, isMark: boolean) => {
  const currentData = reviewData.value[index];
  let id, mark;
  id = currentData.id;
  mark = isMark
    ? JSON.stringify({
        fontWeight: "bold",
        color: "white",
        backgroundColor:"black",
        padding:"2px 7px",
        borderRadius:"5px"
      })
    : "";
  const res = await store.dispatch("review/changeMark", { id, mark });
  if (res) {
    message.success(isMark ? "标记成功！" : "取消标记成功！");
    updateModal.visible = false;
  } else {
    message.warn(isMark ? "标记失败！" : "取消标记失败");
  }
};
const saveUpdate = async () => {
  const [, res] = await to(
    store.dispatch("review/changeComment", { ...updateModal.data })
  );
  if (res) {
    message.success("更新备注成功！");
    updateModal.visible = false;
  } else {
    message.warn("更新备注失败！");
  }
};

//键盘点击事件
const btnToMark=()=>{
  const index=reviewIndex.value;
  if(index!==-1){
    const currentData = reviewData.value[index];
    let isMark=true;
    if(currentData.mark){
      isMark=false;
    }
    toMark(index,isMark);
  }
}
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
document.onkeydown = (e) => {
  console.log(e.key===" ");
  if (updateModal.visible) {
    return;
  }
  switch (e.key) {
    case "w":
      browseShowWord(-1);
      break;
    case "s":
      browseShowWord(1);
      break;
    case " ":
      btnToMark();
      break;
    case "Enter":
      break;
    case "Backspace":
      break;
    default:
  }
  e.preventDefault();
};
onUnmounted(() => (document.onkeydown = null));
</script>

<style lang="scss">
.review__list {
  padding: 0 0 20px 0;
  height: 100%;
  overflow: auto;
  position: relative;
  .li-p {
    line-height: 15px;
    > span:first-child{
      font-weight: bold;
    }
    > span:last-child {
      float: right;
      margin-right: 10px;
    }
  }
  .opt {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 100px;
    > p:first-child {
      padding-top: 10px;
    }
    background-color: #f0f2f5;
    box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: 0.2);
    .edit-comment {
      position: absolute;
      right: 5px;
      bottom: 0;
    }
  }
  ul {
    padding: 20px 10px;
    list-style: none;
    li {
      cursor: pointer;
    }
  }
  .review__list-active {
    color: red;
  }
}
</style>
