<script setup>
defineProps({ title: String });
</script>

<template>
  <el-card class="dashboard_card" shadow="never">
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped>
.dashboard_card {
  width: 100%;
  --el-card-padding: 20px;
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
}

.dashboard_card :deep(.el-card__header) {
  padding: 16px 20px;
  border-bottom-color: var(--el-border-color-lighter);
}

.dashboard_card :deep(.el-card__body) {
  padding: var(--el-card-padding);
}

.dashboard_card h2 {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
</style>
