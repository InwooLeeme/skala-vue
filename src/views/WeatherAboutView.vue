<script setup>
import { RouterLink } from 'vue-router';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';

const steps = [
  { title: '도시 검색', desc: '검색창에 도시 이름을 입력하면 실시간으로 목록이 좁혀집니다.' },
  { title: '날씨 카드 확인', desc: '카드에서 현재 기온과 강풍·습도·구름 상태 뱃지를 한눈에 확인합니다.' },
  { title: '상세보기', desc: '카드를 클릭하거나 상세보기 버튼을 눌러 해당 도시의 날씨를 자세히 확인합니다.' },
];

const stack = ['Vue 3', 'Composition API', 'Vue Router', 'Vite'];
</script>

<template>
  <main class="practice-section">
    <h1 class="task_title">서비스 소개</h1>

    <BaseDashboardCard title="🌤️ 날씨 대시보드">
      <p class="intro">
        도시별 날씨를 검색하고 카드로 한눈에 비교할 수 있는 날씨 대시보드입니다.
        기온, 풍속, 습도, 구름량을 뱃지로 표시해 현재 상태를 빠르게 파악할 수 있습니다.
      </p>
    </BaseDashboardCard>

    <BaseDashboardCard title="🧭 사용 방법">
      <ol class="step_list">
        <li v-for="(step, index) in steps" :key="step.title" class="step_item">
          <span class="step_number">{{ index + 1 }}</span>
          <div>
            <h3 class="step_title">{{ step.title }}</h3>
            <p class="step_desc">{{ step.desc }}</p>
          </div>
        </li>
      </ol>
    </BaseDashboardCard>

    <BaseDashboardCard title="🛠️ 사용 기술">
      <ul class="tech_list">
        <li v-for="tech in stack" :key="tech" class="tech_tag">{{ tech }}</li>
      </ul>
    </BaseDashboardCard>

    <RouterLink to="/" class="back_btn">메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.practice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 32px 20px 48px;
  box-sizing: border-box;
  background-color: #f7f9fb;
  color: #000;
}

.task_title {
  width: 100%;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3e6ea;
  letter-spacing: 0.08em;
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
}

.intro {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #555;
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
  background-color: #4a90d9;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.step_title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #1f2d3d;
}

.step_desc {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: #555;
}

.tech_list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech_tag {
  padding: 4px 12px;
  border-radius: 999px;
  border: 1.5px solid #64748b;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
}

.back_btn {
  padding: 9px 16px;
  background-color: #ffffff;
  border: 1px solid #c8ccd1;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s;
}

.back_btn:hover {
  background-color: #f4f6f8;
  border-color: #aab2bb;
}
</style>
