<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="practice-section">
    <div class="not_found_card">
      <p class="code">404</p>
      <h1 class="message">페이지를 찾을 수 없습니다.</h1>
      <p class="desc">요청하신 주소가 잘못되었거나 삭제된 페이지입니다.</p>
      <RouterLink to="/" class="back_btn">메인 대시보드로 돌아가기</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.practice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(100%, var(--app-content-width));
  min-height: 60vh;
  margin: 0 auto;
  padding: 32px 0 48px;
  color: var(--el-text-color-primary);
}

.not_found_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 32px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  text-align: center;
}

.code {
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: var(--el-color-primary);
}

.message {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}

.desc {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.back_btn {
  padding: 9px 14px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-small);
  color: var(--el-text-color-regular);
  background: var(--el-bg-color);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.back_btn:hover {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-5);
  background: var(--el-color-primary-light-9);
}
</style>
