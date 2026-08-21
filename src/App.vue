<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/UnitToggler.vue'
</script>

<template>
  <div class="app_shell">
    <header class="app_header">
      <div class="brand">
        <span class="brand_mark" aria-hidden="true"></span>
        <h1 class="task_title">펫웨더 산책 가이드</h1>
      </div>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/">날씨 대시보드</RouterLink>
        <RouterLink to="/stats">날씨 통계</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
        <RouterLink to="/troubleshooting">트러블슈팅</RouterLink>
      </nav>
      <UnitToggler />
    </header>
    <RouterView />
  </div>

</template>

<style scoped>
.app_shell {
  width: min(100%, var(--app-content-width));
  min-height: calc(100vh - 48px);
  margin: 0 auto;
}

.app_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 80px;
  padding: 14px 18px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 16px;
  box-shadow: var(--el-box-shadow-light);
}

.brand {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 10px;
}

.brand_mark {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--el-color-primary);
}

.task_title {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

nav::-webkit-scrollbar {
  display: none;
}

nav a {
  flex-shrink: 0;
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  color: var(--el-text-color-regular);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

nav a:hover {
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-7);
}

nav a.router-link-active {
  color: #ffffff;
  background: var(--el-color-primary);
  border-color: var(--el-color-primary);
  box-shadow: 0 5px 12px rgba(40, 120, 76, 0.2);
}

@media (max-width: 760px) {
  .app_shell {
    min-height: calc(100vh - 24px);
  }

  .app_header {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  nav {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
    padding-bottom: 2px;
  }

  .brand {
    justify-content: center;
  }

  nav a {
    text-align: center;
  }
}
</style>
