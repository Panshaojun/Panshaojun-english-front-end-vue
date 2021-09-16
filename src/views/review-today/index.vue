<template>
  <a-row>
    <a-col :span="3"></a-col>
    <a-col :span="18">
      <a-divider orientation="left">
        <h1>今日复习</h1>
      </a-divider>
      <a-col :span="24">
        <a-date-picker v-model:value="date" @change="changeDate()" />
      </a-col>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            {{ item.date }}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
              item.words
            }}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-button
              @click="toReview(item.id)"
              >开始学习</a-button
            >
          </a-list-item>
        </template>
      </a-list>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import moment from "moment";
const store = useStore(key);
const router = useRouter();
const data = ref(store.getters["review/day"]());
store.dispatch("review/freshData");
const date = ref(moment());
const changeDate = () => {
  const chooseDate = date.value
    ? date.value.format("Y-MM-DD")
    : moment().format("Y-MM-DD");
  data.value = store.getters["review/day"](chooseDate);
};
const toReview = (id: number) => {
  store.dispatch("review/freshReviewData", id);
  router.push("/review");
};
</script>
