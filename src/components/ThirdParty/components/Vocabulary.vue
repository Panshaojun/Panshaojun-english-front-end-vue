<template>
  <div class="ThirdParty-vocabulary">
      <p v-html="data.short"></p>
      <p v-html="data.long"></p>
  </div>
</template>

<script setup lang="ts">
import { WordVocabulary } from "@/api/modules/model/wordVocabulary";
defineProps<{
    data:WordVocabulary
}>()

</script>

<style lang="less">
.ThirdParty-vocabulary{
    i {
      color: red;
    }
}
</style>