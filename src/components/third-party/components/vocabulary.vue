<template>
    <div>
      <h3>{{ props.data.v_w }}</h3>
      <p class="v-des" v-html="props.data.v_short"></p>
      <p class="v-des" v-html="props.data.v_long"></p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useStore } from "vuex";
  import { key } from "@/store";
  import { WordView } from "@/api/modules/model/wordView";
  const store = useStore(key);
  const props = defineProps<{
    data: WordView;
  }>();
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
  