<script setup>
import { computed } from 'vue';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';

const weatherList = [
  {
    id : 'city_01', name : '서울', temp : 28, status : '맑음',
    data:{
      clouds : 0,
      humidity: 48,
      wind_speed : 8.23,
    }
  },
  {
    id : 'city_02', name : '수원', temp : 24, status : '비',
    data:{
      clouds : 22,
      humidity: 52,
      wind_speed : 7.31,
    }
  },
  {
    id : 'city_03', name : '부산', temp : 26, status : '구름',
    data:{
      clouds : 10,
      humidity: 66,
      wind_speed : 4.2,
    }
  },
  {
    id: 'city_04', name : '경주', temp : 33, status : '소나기',
    data:{
      clouds : 12,
      humidity: 73,
      wind_speed : 3.12,
    }
  }
];

const average = (values) => (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1);

const avgTemp = computed(() => average(weatherList.map((c) => c.temp)));
const avgHumidity = computed(() => average(weatherList.map((c) => c.data.humidity)));
const avgWindSpeed = computed(() => average(weatherList.map((c) => c.data.wind_speed)));

const hottestCity = computed(() => weatherList.reduce((max, c) => (c.temp > max.temp ? c : max)));
const coldestCity = computed(() => weatherList.reduce((min, c) => (c.temp < min.temp ? c : min)));
</script>

<template>
  <main class="practice-section">
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
          <span class="stat_value">{{ weatherList.length }}개</span>
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
</style>
