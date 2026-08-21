<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">🌤️날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️서비스 소개</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />

</template>

<style scoped>

</style>
