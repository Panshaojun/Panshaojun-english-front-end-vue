<template>
  <div class="review-c-listComment">
    {{ props.data.comment }}
    <span class="edit-comment" @click.capture="openUpdateModal">
      <EditOutlined />
    </span>
  </div>

  <a-modal
    v-model:visible="updateModal.visible"
    :title="updateModal.title"
    @cancel="cancleUpdate"
    @ok="saveUpdate"
  >
    <a-input v-model:value="updateModal.data.comment"></a-input>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { key } from "@/store";
import { ReviewWord } from "@/api/modules/model/reviewWord";
import to from "await-to-js";
import { EditOutlined } from "@ant-design/icons-vue";

const store = useStore(key);
const props = defineProps<{
    editting:boolean;
  data: ReviewWord;
}>();
const emits = defineEmits(["update:editting"]);
const data = store.state.word.data;
const dataInfo = (id: number) => {
  const index = data.findIndex((i) => i.id === id);
  return index === -1 ? "找不到数据" : data[index].w;
};

const updateModal = reactive({
  visible: false,
  title: "",
  data: {
    id: 0,
    comment: "",
  },
});
const openUpdateModal = () => {
  const currentData = props.data;
  updateModal.title = `更改 「${dataInfo(currentData.id)}」 笔记`;
  updateModal.data.id = currentData.id;
  updateModal.data.comment = currentData.comment;
  updateModal.visible = true;
  emits("update:editting", true);
};
const saveUpdate = async () => {
  const [, res] = await to(
    store.dispatch("review/changeComment", { ...updateModal.data })
  );
  message.success(res?"更新备注成功！":"更新备注失败！");
  updateModal.visible = false;
  emits("update:editting", false);
};
const cancleUpdate=()=>{
  updateModal.visible = false;
  emits("update:editting", false);
}
</script>

<style lang="scss">
.review-c-listComment {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 5px;

  line-height: 20px;
  .edit-comment {
    position: absolute;
    right: 5px;
    bottom: 0;
  }
}
</style>
