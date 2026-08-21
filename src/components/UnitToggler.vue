<script setup>
import { unitSymbolStore } from '@/stores/configStore';

const configStore = unitSymbolStore();
</script>

<template>
  <div class="unit_toggler">
    <el-button-group>
      <el-button class="unit_btn" @click="configStore.toggleUnit">{{ configStore.unitSymbol }}</el-button>
      <el-button class="unit_btn" @click="configStore.toggleWindSpeedUnit">{{ configStore.windSpeedUnitLabel }}</el-button>
    </el-button-group>
  </div>
</template>

<style scoped>
.unit_toggler {
  display: flex;
  flex-shrink: 0;
  padding: 3px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 12px;
  background: var(--el-fill-color-light);
}

.unit_btn {
  min-height: 32px;
  color: var(--el-text-color-regular);
  background: var(--el-bg-color);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(35, 64, 46, 0.08);
}

.unit_btn:hover {
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
</style>
