<script setup>
import { computed, ref, watch, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import SearchBar from '@/components/exercise/SearchBar.vue';
import WeatherCard from '@/components/exercise/WeatherCard.vue';
import { weatherStore } from '@/stores/weatherStore';

const router = useRouter();
const store = weatherStore();

const searchQuery = ref('');

const selectedCityInfo = ref(null);

const statusMessage = ref('카드를 클릭하거나 검색해보세요.');

const filteredWeatherList = computed(() => {
  return store.cities.filter((city) => city.name.includes(searchQuery.value));
});

onMounted(() => {
  store.fetchAll();
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
    <section class="home_intro">
      <h1>날씨 대시보드</h1>
      <p>산책할 도시를 검색하고 현재 날씨를 확인하세요.</p>
    </section>

    <BaseDashboardCard title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="searchQuery = $event" />
      <p class="search_state">
        <span v-if="searchQuery">“{{ searchQuery }}” 검색 결과</span>
        <span v-else>검색어가 없으면 기본 도시 전체를 보여줍니다.</span>
      </p>
    </BaseDashboardCard>

    <BaseDashboardCard title="검색한 도시 날씨">
      <p v-if="!store.isLoading" class="result_count">검색 결과 {{ filteredWeatherList.length }}개</p>
      <el-skeleton v-if="store.isLoading" :rows="4" animated />
      <ul v-else-if="filteredWeatherList.length" class="weather_list_container">
        <WeatherCard
          v-for="obj in filteredWeatherList"
          :key="obj.id"
          :city="obj"
          @click-detail="showDetail($event)"
        />
      </ul>
      <el-empty v-else description="검색 결과와 일치하는 도시가 없습니다." :image-size="72" />
      <div class="status_container">
        <p class="status_bar">도시 상세보기를 눌러 산책 가이드를 확인해보세요.</p>
      </div>
    </BaseDashboardCard>
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

.home_intro {
  width: 100%;
  padding: 10px 4px 2px;
}

.home_intro h1 {
  margin: 0 0 7px;
  color: var(--el-text-color-primary);
  font-size: clamp(23px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.home_intro > p:last-child {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.search_state {
  margin: 10px 2px 0;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  font-weight: 500;
}

.weather_list_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.result_count {
  margin: 0 0 10px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.status_container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.status_bar {
  margin: 0;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.practice-section :deep(.el-skeleton__item) {
  background: var(--el-fill-color);
}

@media (max-width: 720px) {
  .practice-section {
    padding-top: 16px;
  }

}

</style>
