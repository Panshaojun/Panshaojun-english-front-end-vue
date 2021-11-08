<template>
  <span v-if="mark" @click.capture="cancelMark">
    <HeartFilled />
  </span>
  <span v-else @click.capture="toMark">
    <HeartOutlined />
  </span>
</template>

<script setup lang="ts">
import { HeartOutlined, HeartFilled } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { key } from "@/store";
import moment from "moment";
import { message } from "ant-design-vue";

const store = useStore(key);
const props = defineProps<{
  id: number;
  mark: string;
}>();

const handleMark = async (mark: string, type: string) => {
  const id = props.id;
  const res = await store.dispatch("review/changeMark", { id, mark });
  if (res) {
    message.success(type + "成功！");
  } else {
    message.warn(type + "失败！");
  }
};
const toMark = () =>
  handleMark(moment().add(1, "days").format("Y-MM-DD"), "标记");
const cancelMark = () => handleMark("", " 取消标记");
</script>
