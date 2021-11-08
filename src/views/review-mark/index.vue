<template>
  <div id="review-mark">
    <a-row>
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-divider orientation="left">
          <h1>标记复习</h1>
        </a-divider>
        <a-col :span="24">
          <a-list item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="review-list">
                  <div class="date">{{ item.date }}</div>
                  <div class="nums">{{ item.data.length }}</div>
                  <div class="go-review">
                    <a-button @click="toReview(item.data)">复习</a-button>
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import moment from "moment";
const store = useStore(key);
const router = useRouter();
store.dispatch("review/freshMarkData");

const data = computed(() => {
  const markData = store.state.review.markData;
  let Ebbinghaus = [-1,0, 1, 2, 4, 7, 15, 30, 90, 180, 360];
  let reviewsDay: string[] = [];
  for (let i of Ebbinghaus) {
    const date = moment();
    reviewsDay.push(date.add(-i, "days").format("Y-MM-DD"));
  }
  const data = [];

  for (let i of reviewsDay) {
    if(markData[i]){
      data.push({
      date: i,
      data: markData[i],
    });
    }
  }
  return data;
});

const toReview = (data:any[]) => {
  const dataCopy=data.map(i=>{
    return {...i}
  })
  store.commit("review/SET_reviewData",dataCopy);
  router.push("/review");
};
</script>

<style lang="scss">
#review-mark {
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
