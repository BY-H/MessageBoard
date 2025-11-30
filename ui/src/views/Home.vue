<template>
  <div>
    <h1>欢迎回来：{{ user?.nickname }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const user = ref<any>(null)

onMounted(async () => {
})
</script>
