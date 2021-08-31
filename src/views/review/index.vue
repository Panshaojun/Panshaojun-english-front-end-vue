<template>
  <div>复习界面</div>
  <ul>
      <li v-for="i,index of data" :key="i.id">{{index+1}}.{{dataInfo(i.id)}}{{i.mark}}:{{i.comment}}</li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store";
const store = useStore(key);
const dataInfo=(id:number)=>{
  const data=store.state.word.data;
  const index=data.findIndex(i=>i.id===id);
  return index===-1?"找不到数据":data[index].w;
}
const data=computed(()=>store.state.review.reviewData);
</script>