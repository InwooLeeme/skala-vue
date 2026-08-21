<script setup>
import { RouterLink } from 'vue-router';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';

const entries = [
  {
    date: '2026-08-21',
    title: 'weatherStore 리팩터링 중 401 Unauthorized',
    background:
      'fetchAll()이 API 응답을 화면용 객체로 바꾸는 로직을 루프 안에 그대로 갖고 있어 가독성이 떨어져, ' +
      '매핑 로직을 toCityWeather() 함수로 분리하는 리팩터링을 진행했습니다.',
    fixedBugs: [
      { title: 'await 누락', desc: 'fetchWeatherData(...) 결과를 await 없이 써서 data가 Promise 객체로 남아있었음' },
      { title: 'cities.value 대입 누락', desc: 'results 배열을 cities.value에 대입하지 않아 스토어가 항상 빈 배열이었음' },
      { title: '함수명 불일치', desc: 'fetchAll이 fetchAllData로 바뀌면서 호출부와 어긋났던 것을 되돌림' },
    ],
    cause:
      '버그를 다 고친 뒤에도 홈 화면에 날씨 목록이 뜨지 않았습니다. axios로 OpenWeatherMap API를 호출하는 ' +
      '과정에서 401 Unauthorized 에러가 발생했는데, 화면에는 store.error가 따로 표시되지 않다 보니 ' +
      '"검색 결과와 일치하는 도시가 없습니다"로만 보여서 원인 파악이 늦어졌습니다.',
    resolution: 'API 키 인증 문제를 해결해 401 에러가 사라지면서 정상적으로 날씨 목록이 표시되었습니다.',
  },
];
</script>

<template>
  <main class="practice-section">
    <h1 class="task_title">트러블슈팅 기록</h1>

    <BaseDashboardCard v-for="entry in entries" :key="entry.title" :title="entry.title">
      <p class="entry_date">{{ entry.date }}</p>

      <h3 class="section_label">배경</h3>
      <p class="intro">{{ entry.background }}</p>

      <h3 class="section_label">수정한 버그</h3>
      <ol class="step_list">
        <li v-for="(bug, index) in entry.fixedBugs" :key="bug.title" class="step_item">
          <span class="step_number">{{ index + 1 }}</span>
          <div>
            <h4 class="step_title">{{ bug.title }}</h4>
            <p class="step_desc">{{ bug.desc }}</p>
          </div>
        </li>
      </ol>

      <h3 class="section_label">문제 상황</h3>
      <p class="intro">{{ entry.cause }}</p>

      <h3 class="section_label">해결</h3>
      <p class="intro resolved">{{ entry.resolution }}</p>
    </BaseDashboardCard>

    <RouterLink to="/" class="back_btn">메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.practice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: min(100%, var(--app-content-width));
  margin: 0 auto;
  padding: 24px 0 48px;
  color: var(--el-text-color-primary);
}

.task_title {
  width: 100%;
  margin: 0;
  padding: 2px 2px 12px;
  border-bottom: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.entry_date {
  margin: 0 0 12px;
  font-size: 11px;
  color: var(--el-text-color-secondary);
}

.section_label {
  margin: 16px 0 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}

.section_label:first-of-type {
  margin-top: 0;
}

.intro {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.intro.resolved {
  padding: 10px 12px;
  border-left: 3px solid var(--el-color-primary);
  border-radius: 0 var(--el-border-radius-small) var(--el-border-radius-small) 0;
  color: var(--el-color-primary-dark-2);
  background: var(--el-color-primary-light-9);
  font-weight: 600;
}

.step_list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step_item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.step_number {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--el-color-primary);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.step_title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}

.step_desc {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--el-text-color-regular);
}

.back_btn {
  align-self: flex-start;
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
