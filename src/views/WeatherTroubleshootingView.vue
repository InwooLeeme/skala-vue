<script setup>
import { RouterLink } from 'vue-router';
import TroubleshootingCard from '@/components/troubleshooting/TroubleshootingCard.vue';

const entries = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    category: 'Router',
    status: '해결',
    statusType: 'success',
    title: '상세 페이지 직접 접근 시 빈 결과 화면이 먼저 노출됨',
    symptom:
      '상세 페이지 URL로 직접 접근하면 날씨 데이터를 불러오는 동안 “도시를 찾을 수 없습니다” 화면이 잠깐 표시됐습니다.',
    causes: [
      '첫 화면이 렌더링되는 시점에는 Store의 도시 목록이 비어 있어 `city` 계산 결과가 `null`이었습니다.',
      '`onMounted()`에서 `fetchAll()`의 완료를 기다리지 않아 로딩 상태와 실제 빈 결과 상태를 구분할 수 없었습니다.',
      'Template에서 도시 데이터보다 로딩 상태를 먼저 확인하지 않아 빈 결과 화면이 먼저 선택됐습니다.',
    ],
    resolution:
      '`pageLoading` 상태를 추가하고 `onMounted()`를 비동기 함수로 변경했습니다. `fetchAll()`과 `fetchCityDetail()`이 끝날 때까지 `await`로 기다린 뒤 로딩 상태를 해제하고, Template에서도 로딩 화면을 가장 먼저 확인하도록 순서를 변경했습니다.',
  },
];
</script>

<template>
  <main class="practice-section">
    <section class="page_intro">
      <h1 class="task_title">트러블슈팅 기록</h1>
      <p>개발 과정에서 발생한 문제를 증상, 원인, 해결 과정으로 나누어 기록했습니다.</p>
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
