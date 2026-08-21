<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import { unitSymbolStore } from '@/stores/configStore';
import { weatherStore } from '@/stores/weatherStore';

const route = useRoute();
const router = useRouter();

const configStore = unitSymbolStore();
const store = weatherStore();

const city = computed(() => store.cities.find((c) => c.id === route.params.cityId) ?? null);

const displayTemp = computed(() => {
  const rawTemp = city.value.temp;
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32);
  }
  return rawTemp;
});

const displayWindSpeed = computed(() => {
  const rawWindSpeed = city.value.data.wind_speed;
  if (configStore.windSpeedUnit === 'kmh') {
    return (rawWindSpeed * 3.6).toFixed(1);
  }
  return rawWindSpeed;
});

onMounted(() => {
  if (!store.cities.length) {
    store.fetchAll();
  }
});
</script>

<template>
  <main class="practice-section">
    <BaseDashboardCard v-if="city" :title="`${city.name} (${city.status})`">
      <div class="detail_grid">
        <div class="detail_item">
          <span class="detail_label">현재 기온</span>
          <span class="detail_value">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
        </div>
        <div class="detail_item">
          <span class="detail_label">풍속</span>
          <span class="detail_value">{{ displayWindSpeed }} {{ configStore.windSpeedUnitLabel }}</span>
        </div>
        <div class="detail_item">
          <span class="detail_label">습도</span>
          <span class="detail_value">{{ city.data.humidity }}%</span>
        </div>
        <div class="detail_item">
          <span class="detail_label">구름량</span>
          <span class="detail_value">{{ city.data.clouds }}%</span>
        </div>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard v-else-if="store.isLoading" title="불러오는 중">
      <p class="no_result">날씨 정보를 불러오는 중입니다...</p>
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <p class="no_result">요청한 도시({{ route.params.cityId }})의 날씨 정보를 찾을 수 없습니다.</p>
    </BaseDashboardCard>

    <button class="back_btn" @click="router.push('/')">메인 대시보드로 돌아가기</button>
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

.detail_grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail_item{
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  background-color: #f7f9fb;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
}

.detail_label{
  font-size: 12px;
  color: #64748b;
}

.detail_value{
  font-size: 16px;
  font-weight: 700;
  color: #1f2d3d;
}

.no_result{
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: #94a3b8;
}

.back_btn{
  padding: 9px 16px;
  background-color: #ffffff;
  border: 1px solid #c8ccd1;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.back_btn:hover{
  background-color: #f4f6f8;
  border-color: #aab2bb;
}
</style>
