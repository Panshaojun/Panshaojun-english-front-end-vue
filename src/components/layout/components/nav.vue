<template>
  <a-menu
    id="dddddd"
    style="width: 256px"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
  >
    <a-sub-menu key="sub1" @titleClick="titleClick">
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>新单词</template>
      <a-menu-item key="1">
        学习新单词
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>旧单词</template>
      <a-menu-item key="5">今日复习</a-menu-item>
      <a-menu-item key="6">全部复习</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>管理</template>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-menu-item key="12">Option 12</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>(["1"]);
    const openKeys = ref<string[]>(["sub1"]);
    const handleClick = (e: Event) => {
      console.log("click", e);
    };
    const titleClick = (e: Event) => {
      console.log("titleClick", e);
    };
    watch(
      () => openKeys,
      (val) => {
        console.log("openKeys", val);
      }
    );
    return {
      selectedKeys,
      openKeys,

      handleClick,
      titleClick,
    };
  },
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
});
</script>
