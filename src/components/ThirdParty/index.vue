<template>
  <div></div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
const props = defineProps<{
  wordId: number;
}>();
let sceneId=1;
watch(()=>props.wordId,()=>{

});

</script>

<style lang="less">

</style>