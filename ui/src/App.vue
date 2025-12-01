<template>
  <div id="app">
    <!-- 全局加载遮罩（可选） -->
    <van-loading
      v-if="loading"
      size="24px"
      type="spinner"
      class="global-loading"
    />

    <!-- 真正的页面内容 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'vant/lib/index.css'

/**
 * 全局 loading，用于以后:
 * - 登录状态检查
 * - 刷新 token
 * - 全局加载请求
 */
const loading = ref(false)
</script>

<style>
/* 页面淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局加载图标 */
.global-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

/* 全局样式：适配移动端 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: #f7f8fa;
}
</style>
