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
.practice-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
  padding: 32px 20px 48px;
  box-sizing: border-box;
  background-color: #f7f9fb;
  color: #000;
}

.not_found_card{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 32px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.code{
  margin: 0;
  font-size: 40px;
  font-weight: 700;
  color: #4a90d9;
}

.message{
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1f2d3d;
}

.desc{
  margin: 0 0 12px;
  font-size: 13px;
  color: #64748b;
}

.back_btn{
  padding: 9px 16px;
  background-color: #ffffff;
  border: 1px solid #c8ccd1;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s;
}

.back_btn:hover{
  background-color: #f4f6f8;
  border-color: #aab2bb;
}
</style>
