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
      <BaseDashboardCard title="📊 전체 통계 요약">
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
            <span class="extreme_label">🔥 최고 기온</span>
            <span class="extreme_city">{{ hottestCity.name }}</span>
            <span class="extreme_value">{{ hottestCity.temp }}°C</span>
          </div>
          <div class="extreme_item cold">
            <span class="extreme_label">❄️ 최저 기온</span>
            <span class="extreme_city">{{ coldestCity.name }}</span>
            <span class="extreme_value">{{ coldestCity.temp }}°C</span>
          </div>
        </div>
      </BaseDashboardCard>
    </template>
  </main>
</template>

<style scoped>
.practice-section{
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

.stat_grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat_item{
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  background-color: #f7f9fb;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
}

.stat_label{
  font-size: 12px;
  color: #64748b;
}

.stat_value{
  font-size: 18px;
  font-weight: 700;
  color: #1f2d3d;
}

.extreme_grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.extreme_item{
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 8px;
  border: 1.5px solid;
}

.extreme_item.hot{
  border-color: #ff6b6b;
}

.extreme_item.cold{
  border-color: #4a90d9;
}

.extreme_label{
  font-size: 12px;
  color: #64748b;
}

.extreme_city{
  font-size: 15px;
  font-weight: 700;
  color: #1f2d3d;
}

.extreme_value{
  font-size: 13px;
  color: #555;
}

.no_result{
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}
</style>
