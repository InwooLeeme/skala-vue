<script setup>
import { computed } from 'vue';
import { unitSymbolStore } from '@/stores/configStore';

const props = defineProps({ city: Object, selected: Boolean });
defineEmits(['select-card', 'click-detail']);

const configStore = unitSymbolStore();

const displayTemp = computed(() => {
  const rawTemp = props.city.temp;
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32);
  }
  return rawTemp;
});

const displayWindSpeed = computed(() => {
  const rawWindSpeed = props.city.data.wind_speed;
  if (configStore.windSpeedUnit === 'kmh') {
    return (rawWindSpeed * 3.6).toFixed(1);
  }
  return rawWindSpeed;
});
</script>

<template>
  <li class="card" :class="{ selected: selected }" @click="$emit('select-card', city)">
    <div class="card_header">
      <div>
        <h2>{{ city.name }}</h2>
      </div>
      <div class="card_actions">
        <el-button class="detail_btn" type="primary" @click.stop="$emit('click-detail', city)">
          상세보기
        </el-button>
      </div>
    </div>

    <div class="temp">
      <span>현재 기온</span>
      <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
    </div>

    <div class="badge_group" aria-label="날씨 상태">
      <el-tag v-if="city.temp >= 25" class="badge hot" type="danger" effect="light" round>
        더움 (25도 이상)
      </el-tag>
      <el-tag v-else class="badge cold" type="success" effect="light" round>
        신선함 (25도 미만)
      </el-tag>
      <el-tag v-if="city.data.wind_speed >= 5.0" class="badge fast" type="warning" effect="light" round>
        강풍 {{ displayWindSpeed }} {{ configStore.windSpeedUnitLabel }}
      </el-tag>
      <el-tag v-else class="badge slow" type="info" effect="light" round>
        약풍 {{ displayWindSpeed }} {{ configStore.windSpeedUnitLabel }}
      </el-tag>
      <el-tag v-if="city.data.humidity >= 60" class="badge humid" type="info" effect="light" round>
        습함 {{ city.data.humidity }}%
      </el-tag>
      <el-tag v-else class="badge dry" type="success" effect="light" round>
        쾌적 {{ city.data.humidity }}%
      </el-tag>
      <el-tag v-if="city.data.clouds >= 50" class="badge cloudy" type="info" effect="light" round>
        흐림 {{ city.data.clouds }}%
      </el-tag>
      <el-tag v-else class="badge clear" type="success" effect="light" round>
        맑음 {{ city.data.clouds }}%
      </el-tag>
    </div>
  </li>
</template>

<style scoped>
.card {
  position: relative;
  padding: 17px;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  transition:
    border-color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    box-shadow var(--el-transition-duration),
    transform var(--el-transition-duration);
}

.card:hover {
  border-color: var(--el-color-primary-light-5);
  box-shadow: 0 8px 20px rgba(35, 64, 46, 0.08);
  transform: translateY(-1px);
}

.card.selected {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  box-shadow: 0 8px 20px rgba(35, 64, 46, 0.12);
}

.card_header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.card h2 {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 700;
}

.card .temp {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 14px;
}

.card .temp span {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.card .temp strong {
  color: var(--el-text-color-primary);
  font-size: 18px;
}

.badge_group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.badge {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
}

.card_actions {
  display: flex;
  flex: 0 0 auto;
  gap: 6px;
}

.detail_btn {
  font-size: 12px;
  font-weight: 600;
}

.detail_btn:hover {
  border-color: var(--el-color-primary-dark-2);
  background: var(--el-color-primary-dark-2);
  transform: translateY(-1px);
}

.detail_btn:focus-visible {
  outline-color: var(--el-color-primary-light-5);
}

@media (max-width: 480px) {
  .card_header {
    align-items: stretch;
    flex-direction: column;
  }

  .card_actions {
    align-self: flex-start;
  }
}
</style>
