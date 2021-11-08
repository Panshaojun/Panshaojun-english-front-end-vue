<template>
  <div id="layout">
    <header id="layout-header">
      <MyHeader/>
    </header>
    <main id="layout-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import MyHeader from './components/header.vue';
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
    padding: 10px 20px;
    z-index: 4;
    height: 50px;
    width: 100vw;
    background-color: white;
    box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: .1);
  }
  #layout-main {
    position: absolute;
    z-index: 3;
    top: 50px;
    right: 0;
    height: calc(100vh - 50px);
    width: 100vw;
    background: #f0f2f5;
    overflow: auto;
  }
}
</style>
