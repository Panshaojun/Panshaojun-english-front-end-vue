<template>
  <div>
    <a-button @click="visible = true" :style="{ marginRight: '20px' }">
      <template #icon>
        <MenuFoldOutlined />
      </template>
    </a-button>
    <a-button @click="goBack()">
      <template #icon>
        <ArrowLeftOutlined />
      </template>
    </a-button>
  </div>
  <a-drawer
    title="导航菜单"
    placement="left"
    width="250px"
    v-model:visible="visible"
  >
    <a-menu mode="inline">
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>新单词</template>
        <a-menu-item key="1">
          <span @click="go('/study')">学习新单词</span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>旧单词</template>
        <a-menu-item key="5">
          <span @click="go('/review-today')">今日单词学习</span>
        </a-menu-item>
        <a-menu-item key="6">
          <span @click="go('/review-mark')">今日标记单词学习</span>
        </a-menu-item>
        <a-menu-item key="7">
          <span @click="go('/review-all')">所有学习</span>
        </a-menu-item>
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
  </a-drawer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons-vue";
const visible = ref(false);
const router = useRouter();
const go = (url: string) => {
  visible.value = false;
  router.push(url);
};
const goBack = () => {
  router.go(-1);
};
</script>
