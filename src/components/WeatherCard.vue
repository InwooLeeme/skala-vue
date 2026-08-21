<script setup>
defineProps({ city: Object, selected: Boolean });
defineEmits(['select-card', 'click-detail']);
</script>

<template>
  <li class="card" :class="{ selected }" @click="$emit('select-card', city)">
    <h1>{{ city.name }} ({{ city.status }})</h1>
    <button class="detail_btn" @click.stop="$emit('click-detail', city)">상세보기</button>
     <div class="temp">현재 기온 : {{ city.temp }}°C</div>
    <span v-if="city.temp >= 25" class="badge hot">🔥더움 (25도 이상)</span>
    <span v-else class="badge cold">❄️신선함 (25도 미만)</span>
    <span v-if="city.data.wind_speed >= 5.0" class="badge fast">💨강풍 {{ city.data.wind_speed }} m/s</span>
    <span v-else class="badge slow">💨약풍 {{ city.data.wind_speed }} m/s</span>
    <span v-if="city.data.humidity >= 60" class="badge humid">💧습함 {{ city.data.humidity }}%</span>
    <span v-else class="badge dry">💧쾌적 {{ city.data.humidity }}%</span>
    <span v-if="city.data.clouds >= 50" class="badge cloudy">☁️흐림 {{ city.data.clouds }}%</span>
    <span v-else class="badge clear">☁️맑음 {{ city.data.clouds }}%</span>
  </li>
</template>

<style scoped>
.card{
  position: relative;
  padding: 12px 14px;
  background-color: #ffffff;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
}

.card h1{
  margin: 0;
  padding-right: 72px;
  font-size: 14px;
  font-weight: 700;
}

.card .temp{
  margin-top: 4px;
  font-size: 13px;
  color: #555;
}

.badge{
  display: inline-block;
  margin-top: 8px;
  margin-right: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  color: #fff;
}

.badge.hot{
  background-color: #ff6b6b;
}

.badge.cold{
  background-color: #4a90d9;
}

.badge.fast,
.badge.slow{
  background-color: transparent;
  border: 1.5px solid #64748b;
  color: #64748b;
  font-weight: 600;
}

.badge.humid,
.badge.dry{
  background-color: transparent;
  border: 1.5px solid #0d9488;
  color: #0d9488;
  font-weight: 600;
}

.badge.cloudy,
.badge.clear{
  background-color: transparent;
  border: 1.5px solid #94a3b8;
  color: #64748b;
  font-weight: 600;
}

.detail_btn{
  position: absolute;
  top: 12px;
  right: 14px;
  padding: 4px 9px;
  background-color: #ffffff;
  border: 1px solid #c8ccd1;
  border-radius: 3px;
  font-size: 11px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.detail_btn:hover{
  background-color: #f4f6f8;
  border-color: #aab2bb;
}

.detail_btn:focus-visible{
  outline: 2px solid;
  outline-offset: 1px;
}
</style>
