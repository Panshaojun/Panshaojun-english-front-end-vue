<template>
  <div id="review-tody">
    <a-row>
      <!-- <a-col :span="24">
        <a-date-picker v-model:value="date" @change="changeDate()" />
      </a-col> -->
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-divider orientation="left">
          <h1>明日单词</h1>
        </a-divider>
        <a-col :span="24">
          <a-list item-layout="horizontal" :data-source="tomarrowData">
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
    <a-row>
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-divider orientation="left">
          <h1>最近单词</h1>
        </a-divider>
        <a-col :span="24">
          <a-list item-layout="horizontal" :data-source="recentlyData">
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
    <a-row>
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-divider orientation="left">
          <h1>久远单词</h1>
        </a-divider>
        <a-col :span="24">
          <a-list item-layout="horizontal" :data-source="formerData">
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="review-list">
                  <div class="date">{{ item.date }}</div>
                  <div class="nums">{{ item.words }}</div>
                  <div class="go-review">
                    <a-button @click="toReview(item.id,'formal')">复习</a-button>
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
store.dispatch("review/freshData");

const tomarrowData = ref<any>([]); // 明日单词复习
const recentlyData = ref<any>([]); // 15天内单词复习
const formerData = ref<any>([]); // 15天以后的单词复习

// 更改时间，改变今日复习
const date = ref(moment()); // 日期
const changeDate = () => {
  const chooseDate = date.value
    ? date.value.format("Y-MM-DD")
    : moment().format("Y-MM-DD");
  tomarrowData.value = store.getters["review/specifyDate"]([-1]);
  recentlyData.value = store.getters["review/specifyDate"](
    [0, 1, 2, 4, 7],
    chooseDate
  );
  formerData.value = store.getters["review/specifyDate"](
    [15, 30, 90, 180, 360],
    chooseDate
  );
};
watch(() => store.state.review.data, changeDate);

const toReview = (id: number,type='normal') => {
  store.dispatch("review/freshReviewData", id);
  router.push("/review?type="+type);
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
