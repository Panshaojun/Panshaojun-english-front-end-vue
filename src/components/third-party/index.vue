<template>
  <div id="third-party">
    <div v-if="thirdParty.msg">
      {{ thirdParty.msg }}
    </div>
    <div v-else>
      <div v-if="thirdParty.data">
        <MyDisplay :data="thirdParty.data"></MyDisplay>
      </div>
      <div v-else>获取的数据为空</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  watch, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { WordView } from "@/api/modules/model/wordView";
import MyDisplay from './components/display.vue';
const store = useStore(key);
const props = defineProps<{
  wordId: number;
}>();
const thirdParty = reactive<{
  data: WordView | null;
  msg: string;
}>({
  data: null,
  msg: "",
});
watch(
  () => props.wordId,
  async () => {
    thirdParty.msg = "加载中";
    const data = await store.dispatch("thirdParty/getData", props.wordId);
    if (data) {
      thirdParty.data = data;
      thirdParty.msg = "";
    } else {
      thirdParty.msg = "加载失败";
    }
  }
);
</script>

<style lang="scss">
#third-party {
  .v-des {
    i {
      color: red;
    }
  }
}
</style>
