<template>
  <div id="review-tody">
    <a-row>
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-divider orientation="left">
          <h1>今日复习</h1>
        </a-divider>
        <a-col :span="24">
          <a-date-picker v-model:value="date" @change="changeDate()" />
        </a-col>
        <a-col :span="24">
          <a-list item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="review-list">
                  <div class="date">{{ item.date }}</div>
                  <div class="nums">{{ item.words }}</div>
                  <div class="go-review">
                    <a-button @click="toReview(item.id)">复习</a-button>
                  </div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import moment from "moment";
const store = useStore(key);
const router = useRouter();
const data = ref<any>();
store.dispatch("review/freshData");

const date = ref(moment());
const changeDate = () => {
  const chooseDate = date.value
    ? date.value.format("Y-MM-DD")
    : moment().format("Y-MM-DD");
  data.value = store.getters["review/day"](chooseDate);
};
watch(() => store.state.review.data, changeDate);
const toReview = (id: number) => {
  store.dispatch("review/freshReviewData", id);
  router.push("/review");
};
</script>

<style lang="scss">
#review-tody {
  .review-list {
    display: flex;
    .date {
      line-height: 40px;
      flex: 0 0 100px;
    }
    .nums {
      line-height: 40px;
      flex: 0 0 50px;
      font-weight: bold;
    }
  }
}
</style>
