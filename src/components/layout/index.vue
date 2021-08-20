<template>
  <div id="layout">
    <header id="layout-header">
      ？？
    </header>
    <nav id="layout-nav">
      <my-nav />
    </nav>
    <main id="layout-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import MyNav from "./components/nav.vue";
</script>

<style lang="scss">
#layout {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  #layout-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 50px;
    width: 100vw;
    background-color: #1890ff;
  }
  #layout-nav {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 2;
    height: calc(100vh - 50px);
    width: 200px;
  }
  #layout-main {
    position: absolute;
    z-index: 3;
    top: 50px;
    right: 0;

    height: calc(100vh - 50px);
    width: calc(100vw - 200px);
    background: #f0f2f5;
    overflow: auto;
  }
}
</style>
