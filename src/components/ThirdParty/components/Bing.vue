<template>
  <div>
    <h3>{{ data.key }}</h3>
    <div class="bing_audio">
      <span v-for="(i, k) of data.audio" :key="k">
        <span v-html="i.title"></span>
      </span>
    </div>

    <div class="bing__definition">
      <div
        v-for="(i, k) of data.definition"
        :key="k"
        v-html="i.title + i.item"
      ></div>
    </div>

    <div class="bing__wordchange" v-if="data.word_change.length">
      词形变换:&nbsp;<span
        v-for="(i, k) of data.word_change"
        :key="k"
        :title="i.key"
        >{{ i.val }}</span
      >
    </div>

    <div class="bing__examples">
      <p class="bing__examples-t">例句</p>
      <div class="bing__examples-e" v-for="(i, k) of data.examples" :key="k">
        <p v-html="i.en"></p>
        <p v-html="i.cn"></p>
      </div>
    </div>

    <div class="bing__english-chinese">
      <h2>英汉双解:</h2>
      <div v-for="(i, k) of data.english_chinese" :key="k">
        <span class="type">{{ i.type }}</span>
        <ul class="list">
          <li v-for="(j, k2) of i.examples" :key="k2">
            <span v-html="j.english_words"></span>
            <span v-html="j.chinese_explanation"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WordBing } from "@/api/modules/model/wordBing";
defineProps<{
  data: WordBing;
}>();
</script>

<style lang="less"></style>
