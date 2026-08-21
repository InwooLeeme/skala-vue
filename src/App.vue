<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/UnitToggler.vue'
</script>

<template>
  <div>
    <header>
      <h1 class="task_title">과제 5 : 스토어적용</h1>
    </header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">🌤️날씨 대시보드</RouterLink>
        <RouterLink to="/stats">📊날씨 통계</RouterLink>
        <RouterLink to="/about">ℹ️서비스 소개</RouterLink>
      </nav>
      <UnitToggler />
    </div>
    <RouterView />
  </div>

</template>

<style scoped>
header {
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e6ea;
}

header .task_title {
  margin: 0;
  letter-spacing: 0.08em;
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f9fb;
  padding: 12px 24px;
  border-bottom: 1px solid #e3e6ea;
}

nav {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

nav a {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1.5px solid #c8ccd1;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}

nav a:hover {
  background-color: #f4f6f8;
  border-color: #aab2bb;
}

nav a.router-link-active {
  background-color: #4a90d9;
  border-color: #4a90d9;
  color: #ffffff;
}

</style>
