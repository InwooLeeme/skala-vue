<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import SearchBar from '@/components/exercise/SearchBar.vue';
import WeatherCard from '@/components/exercise/WeatherCard.vue';

const router = useRouter();

const weatherList = ref([
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
]);

const searchQuery = ref('');

const selectedCityInfo = ref(null);

const statusMessage = ref('카드를 클릭하거나 검색해보세요.');

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value));
});

const showDetail = (city) => {
  router.push(`/weather/${city.id}`);
}

watchEffect(() => {
  console.log(`검색어가 변경되었습니다 ${searchQuery.value}`);
}); 

watch(selectedCityInfo, (newValue) => {
  if(!newValue) return;
  statusMessage.value = `${newValue.name}이 선택되었습니다.`;
  console.log(`상태바 문구 변경 : ${statusMessage.value}`);
})

</script>

<template>
<main class="practice-section">
    <BaseDashboardCard title="🔍도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="searchQuery = $event" />
      <h3>검색 중인 도시 : {{ searchQuery }}</h3>
    </BaseDashboardCard>

    <BaseDashboardCard title="지역별 날씨 현황">
      <ul v-if="filteredWeatherList.length" class="weather_list_container">
        <WeatherCard
          v-for="obj in filteredWeatherList"
          :key="obj.id"
          :city="obj"
          :selected="selectedCityInfo?.id === obj.id"
          @select-card="selectedCityInfo = $event"
          @click-detail="showDetail($event)"
        />
      </ul>
      <p v-else class="no_result">검색 결과와 일치하는 도시가 없습니다.</p>
      <div class="status_container">
        <h2 class="status_bar">{{ statusMessage }}</h2>
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

.task_title{
  width: 100%;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3e6ea;
  letter-spacing: 0.08em;
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
}

.weather_list_container{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.status_container{
  width: 100%;
  padding-top: 10px;
  margin-top: 10px;
  justify-content: center;
  display: flex;
}

.no_result{
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}

</style>