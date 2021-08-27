<template>
  <a-row>
    <a-col :span="3"></a-col>
    <a-col :span="18">
      <a-divider orientation="left">
        <h1>今日复习</h1>
      </a-divider>
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

  <div>复习界面</div>
  <ul>
    <li v-for="i of data" :key="i.id"></li>
  </ul>
</template>

<script setup lang="ts">
import moment from "moment";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const router = useRouter();
const data = computed(() => store.getters["review/day"]());
store.dispatch("review/freshData");
const toReview = (id: number) => {
  store.dispatch("review/freshReviewData", id);
  router.push("/review");
};
</script>
