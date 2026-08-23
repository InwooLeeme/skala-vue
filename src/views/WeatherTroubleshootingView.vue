<script setup>
import { RouterLink } from 'vue-router';
import TroubleshootingCard from '@/components/troubleshooting/TroubleshootingCard.vue';

const entries = [
  {
    date: '2026-08-21',
    category: 'Store',
    status: '해결',
    statusType: 'success',
    title: 'weatherStore 비동기 데이터 갱신 실패',
    symptom:
      'Mock 데이터를 실제 API 데이터로 교체한 뒤 요청은 실행됐지만 홈 화면의 도시 목록이 계속 비어 있었습니다.',
    causes: [
      '`fetchWeatherData(...)` 호출에 `await`가 없어 응답 대신 Promise 객체를 사용했습니다.',
      'API 결과를 담은 `results` 배열을 `cities.value`에 대입하지 않아 Store 상태가 갱신되지 않았습니다.',
      '`fetchAll`과 `fetchAllData`가 혼용되어 Store와 화면의 함수 호출명이 일치하지 않았습니다.',
    ],
    resolution:
      'API 호출을 `await`로 기다린 뒤 응답을 `toCityWeather()`에서 화면용 객체로 변환하고, 완성된 배열을 `cities.value`에 한 번에 대입했습니다. Store와 화면에서 사용하는 함수명도 `fetchAll`로 통일했습니다.',
    lesson:
      '비동기 요청 문제를 확인할 때는 API 응답 여부와 반응형 상태 대입 여부를 분리해서 확인해야 한다는 점을 배웠습니다.',
  },
  {
    date: '2026-08-21',
    category: 'API',
    status: '해결',
    statusType: 'success',
    title: 'OpenWeatherMap 401 오류가 빈 검색 결과로 표시됨',
    symptom:
      '도시 날씨가 표시되지 않았지만 화면에는 API 오류가 아닌 “검색 결과와 일치하는 도시가 없습니다”라는 안내만 나타났습니다.',
    causes: [
      'OpenWeatherMap 요청이 API Key 인증 문제로 `401 Unauthorized`를 반환했습니다.',
      '`store.error`를 화면에서 별도로 표시하지 않아 요청 실패와 정상적인 빈 검색 결과를 구분할 수 없었습니다.',
    ],
    resolution:
      '환경 변수에 등록한 API Key와 인증 상태를 다시 확인해 401 오류를 해결했습니다. 요청이 정상화된 뒤 Store에 도시 날씨가 저장되고 목록이 표시되는 것을 확인했습니다.',
    lesson:
      '로딩, 요청 실패, 정상적인 빈 결과는 서로 다른 상태이므로 사용자 화면에서도 구분해서 보여줘야 원인을 빠르게 찾을 수 있습니다.',
  },
  {
    date: '2026-08-21',
    category: 'UI',
    status: '보완 예정',
    statusType: 'warning',
    title: 'Element Plus 개편 후 카드 선택 기능 연결 해제',
    symptom:
      '날씨 카드를 클릭해도 선택한 카드의 강조 스타일과 “도시가 선택되었습니다” 상태 문구가 변경되지 않습니다.',
    causes: [
      '`selectedCityInfo`와 `watch` 코드는 남아 있지만 `WeatherCard`의 `select-card` 이벤트 발생 코드가 제거됐습니다.',
      '부모 화면에서 `selected` prop과 `select-card` 이벤트 연결이 빠지고 상태 문구가 고정 문장으로 교체됐습니다.',
    ],
    resolution:
      '`WeatherCard`에서 카드 클릭 시 `select-card`를 발생시키고, 부모에서 `selectedCityInfo`를 갱신하도록 다시 연결할 예정입니다. 상세보기 버튼에는 `.stop`을 적용해 카드 선택 이벤트와 페이지 이동이 동시에 실행되지 않도록 구분합니다.',
    lesson:
      'UI 라이브러리로 Template을 다시 작성할 때 디자인뿐 아니라 기존 props와 emit의 연결도 함께 점검해야 합니다.',
  },
];
</script>

<template>
  <main class="practice-section">
    <section class="page_intro">
      <h1 class="task_title">트러블슈팅 기록</h1>
      <p>개발 과정에서 발생한 문제를 증상, 원인, 해결 과정과 배운 점으로 나누어 기록했습니다.</p>
      <el-tag type="info" effect="plain" round>총 {{ entries.length }}건</el-tag>
    </section>

    <section class="troubleshooting_list" aria-label="트러블슈팅 목록">
      <TroubleshootingCard
        v-for="entry in entries"
        :key="entry.title"
        :entry="entry"
      />
    </section>

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

.page_intro {
  width: 100%;
  padding: 2px 2px 16px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.task_title {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: clamp(23px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.page_intro p {
  margin: 7px 0 12px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.troubleshooting_list {
  display: grid;
  gap: 16px;
  width: 100%;
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
