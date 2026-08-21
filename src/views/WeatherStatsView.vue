<script setup>
import { computed, onMounted } from 'vue';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import { weatherStore } from '@/stores/weatherStore';

const store = weatherStore();

const average = (values) => (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1);

const avgTemp = computed(() => average(store.cities.map((c) => c.temp)));
const avgHumidity = computed(() => average(store.cities.map((c) => c.data.humidity)));
const avgWindSpeed = computed(() => average(store.cities.map((c) => c.data.wind_speed)));

const hottestCity = computed(() => store.cities.reduce((max, c) => (c.temp > max.temp ? c : max)));
const coldestCity = computed(() => store.cities.reduce((min, c) => (c.temp < min.temp ? c : min)));

onMounted(() => {
  if (!store.cities.length) {
    store.fetchAll();
  }
});
</script>

<template>
  <main class="practice-section">
    <BaseDashboardCard v-if="!store.cities.length" title="불러오는 중">
      <p class="no_result">날씨 정보를 불러오는 중입니다...</p>
    </BaseDashboardCard>

    <template v-else>
    <BaseDashboardCard title="전체 통계 요약">
        <div class="stat_grid">
          <div class="stat_item">
            <span class="stat_label">평균 기온</span>
            <span class="stat_value">{{ avgTemp }}°C</span>
          </div>
          <div class="stat_item">
            <span class="stat_label">평균 습도</span>
            <span class="stat_value">{{ avgHumidity }}%</span>
          </div>
          <div class="stat_item">
            <span class="stat_label">평균 풍속</span>
            <span class="stat_value">{{ avgWindSpeed }} m/s</span>
          </div>
          <div class="stat_item">
            <span class="stat_label">집계 도시 수</span>
            <span class="stat_value">{{ store.cities.length }}개</span>
          </div>
        </div>
      </BaseDashboardCard>

      <BaseDashboardCard title="🏆 최고 · 최저 기온 도시">
        <div class="extreme_grid">
          <div class="extreme_item hot">
            <span class="extreme_label">최고 기온</span>
            <span class="extreme_city">{{ hottestCity.name }}</span>
            <span class="extreme_value">{{ hottestCity.temp }}°C</span>
          </div>
          <div class="extreme_item cold">
            <span class="extreme_label">최저 기온</span>
            <span class="extreme_city">{{ coldestCity.name }}</span>
            <span class="extreme_value">{{ coldestCity.temp }}°C</span>
          </div>
        </div>
      </BaseDashboardCard>
    </template>
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

.stat_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat_item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 15px;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
}

.stat_label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.stat_value {
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 700;
}

.extreme_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.extreme_item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid;
  border-radius: var(--el-border-radius-base);
}

.extreme_item.hot {
  border-color: var(--el-color-danger-light-7);
  background: var(--el-color-danger-light-9);
}

.extreme_item.cold {
  border-color: var(--el-color-primary-light-7);
  background: var(--el-color-primary-light-9);
}

.extreme_label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.extreme_city {
  color: var(--el-text-color-primary);
  font-size: 15px;
  font-weight: 700;
}

.extreme_value {
  font-size: 13px;
  color: var(--el-text-color-regular);
}

.no_result {
  margin: 0;
  padding: 28px 16px;
  text-align: center;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

@media (max-width: 560px) {
  .stat_grid,
  .extreme_grid {
    grid-template-columns: 1fr;
  }
}
</style>
