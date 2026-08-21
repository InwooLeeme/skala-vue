<script setup>
import { unitSymbolStore } from '@/stores/configStore';

const configStore = unitSymbolStore();
</script>

<template>
  <div class="unit_toggler">
    <button class="unit_btn" @click="configStore.toggleUnit">🌡️ {{ configStore.unitSymbol }}</button>
    <button class="unit_btn" @click="configStore.toggleWindSpeedUnit">💨 {{ configStore.windSpeedUnitLabel }}</button>
  </div>
</template>

<style scoped>
.unit_toggler {
  display: flex;
  gap: 8px;
}

.unit_btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1.5px solid #c8ccd1;
  background-color: #ffffff;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}

.unit_btn:hover {
  background-color: #f4f6f8;
  border-color: #aab2bb;
}
</style>
