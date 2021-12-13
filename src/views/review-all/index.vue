<template>
  <a-row>
    <a-col :span="3"></a-col>
    <a-col :span="18">
      <a-divider orientation="left">
        <h1>所有复习</h1>
      </a-divider>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            {{ item.date }}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              item.words
            }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-button
              @click="toReview(item.id, item.date)"
              >开始学习</a-button
            >
            <a-button @click="changeDate(item)">修改日期</a-button>
          </a-list-item>
        </template>
      </a-list>
    </a-col>
  </a-row>
  <a-modal v-model:visible="modal.visible" title="日期更改" @ok="handleOk">
    <a-date-picker v-model:value="modal.date" />
  </a-modal>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { message } from "ant-design-vue";
import moment from "moment";

const store = useStore(key);
const router = useRouter();
const data = computed(() => store.state.review.data);
store.dispatch("review/freshData");

const maxDateNumber = Number(moment().add(-15, "days").format("YMMDD"));
const toReview = (id: number, date: string) => {
  const dateNumber = Number(moment(date).format("YMMDD"));
  const type = dateNumber >= maxDateNumber ? "normal" : "formal";
  store.dispatch("review/freshReviewData", id);
  router.push("/review?type=" + type);
};

const modal = reactive({
  visible: false,
  id: 0,
  date: moment(),
});
const changeDate = (item: { id: number; date: string }) => {
  modal.date = moment(item.date);
  modal.id = item.id;
  modal.visible = true;
};
const handleOk = async () => {
  const id = modal.id;
  const date = modal.date
    ? modal.date.format("Y-MM-DD")
    : moment().format("Y-MM-DD");
  const res = await store.dispatch("review/changeDate", { id, date });
  if (res) {
    message.success("修改日期成功！");
  } else {
    message.error("修改日期失败！");
  }
  modal.visible = false;
};
</script>
