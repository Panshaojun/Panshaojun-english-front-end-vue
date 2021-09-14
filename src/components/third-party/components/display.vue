<template>
  <div class="bing">
    <div>
      <div>
        <h3>{{ props.data.id }}</h3>
        <h3>{{ props.data.v_w }}</h3>
        <p class="v-des" v-html="props.data.v_short"></p>
        <p class="v-des" v-html="props.data.v_long"></p>
      </div>
      <h3>{{ props.data.b_w }}</h3>
      <div class="bing_audio">
        <span v-for="(i, index) of props.data.audio">
          <MyAudio
            v-if="index === 0"
            :audio="audioData"
          />
          <span v-html="i.title"></span>
        </span>
      </div>

      <div class="bing__definition">
        <div v-for="i of props.data.definition" v-html="i.title + i.item"></div>
      </div>

      <div class="bing__wordchange" v-if="props.data.word_change.length">
        词形变换:&nbsp;<span
          v-for="i of props.data.word_change"
          :title="i.key"
          >{{ i.val }}</span
        >
      </div>

      <div class="bing__examples">
        <p class="bing__examples-t">例句</p>
        <div class="bing__examples-e" v-for="i of props.data.examples">
          <p v-html="i.en"></p>
          <p v-html="i.cn"></p>
        </div>
      </div>

      <div class="bing__english-chinese">
        <h2>英汉双解:</h2>
        <div v-for="i of props.data.english_chinese">
          <span class="type">{{ i.type }}</span>
          <ul class="list">
            <li v-for="j of i.examples">
              <span v-html="j.english_words"></span>
              <span v-html="j.chinese_explanation"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="sider">
      <div class="bing__sider">
        <div v-for="i of props.data.sider">
          <h3>{{ i.title }}</h3>
          <div v-for="j of i.content">
            <span class="type">{{ j.type }}</span>
            <div v-for="x of j.list">{{ x }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import MyAudio from "@/components/audio/index.vue";
import { WordView } from "@/api/modules/model/wordView";
const props = defineProps<{
  data: WordView;
}>();
const audioData=computed(()=>{
  return { id: props.data.id, url: props.data.audio[0].url }
})
</script>

<style lang="scss">
#third-party {
  .v-des {
    i {
      color: red;
    }
  }
  .bing {
    display: flex;
    .sider {
      flex: 0 0 200px;
    }
    .bing__definition {
      > div {
        padding-bottom: 10px;
      }
      .client_def_title,
      .client_def_title_web {
        font-weight: bold;
        color: white;
        padding: 2px 6px;
        margin-right: 5px;
        border-radius: 4px;
      }
      .client_def_title {
        background-color: #aaaaaa;
      }
      .client_def_title_web {
        background-color: black;
      }
    }
    .bing__english-chinese {
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      .type {
        background-color: #aaaaaa;
        font-weight: bold;
        color: white;
        padding: 2px 6px;
        margin-right: 5px;
        border-radius: 4px;
        margin: 5px;
      }
      .list {
        padding-left: 25px;
        list-style: decimal;
        .defgra {
          font-weight: bold;
          color: red;
          padding: 0 5px;
        }
        .itemname {
          font-weight: bold;
        }
        .itmeval {
          margin-left: 20px;
        }
      }
    }
    .bing__wordchange {
      span {
        margin: 0 5px;
        color: #0066aa;
      }
    }
    .bing__examples {
      .bing__examples-e {
        padding-bottom: 10px;
        p {
          line-height: 10px;
        }
        .key {
          color: #0066aa;
        }
      }
    }
    .bing__sider {
      .title {
        padding: 10px 0;
        font-weight: bold;
      }
      .type {
        background-color: #aaaaaa;
        font-weight: bold;
        color: white;
        padding: 2px 6px;
        margin-right: 5px;
        border-radius: 4px;
      }
    }
  }
}
</style>
