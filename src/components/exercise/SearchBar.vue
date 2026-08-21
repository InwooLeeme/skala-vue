<script setup>
defineProps({ searchQuery: String });
defineEmits(['update-query']);
</script>

<template>
  <div class="search_box">
    <el-input
      :model-value="searchQuery"
      clearable
      placeholder="검색하고 싶은 도시를 입력하세요"
      size="large"
      @update:model-value="$emit('update-query', $event)"
    >
      <template #prepend>
        <span class="input_label">도시 이름</span>
      </template>
      <template #append>
        <el-button class="search_btn" @click="$emit('update-query', searchQuery)">
          검색
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.search_box {
  width: 100%;
}

.search_box :deep(.el-input__wrapper) {
  min-height: 44px;
  background: var(--el-fill-color-lighter);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}

.search_box :deep(.el-input__wrapper.is-focus) {
  box-shadow:
    0 0 0 1px var(--el-color-primary) inset,
    0 0 0 3px var(--el-color-primary-light-8);
}

.search_box :deep(.el-input-group__prepend) {
  padding: 0 16px;
  color: var(--el-text-color-primary);
  background: var(--el-fill-color-light);
  border-radius: var(--el-border-radius-base) 0 0 var(--el-border-radius-base);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}

.input_label {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.search_box :deep(.el-input-group__append) {
  min-width: 88px;
  padding: 0;
  overflow: hidden;
  color: #ffffff;
  background: var(--el-color-primary);
  border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
  box-shadow: none;
}

.search_btn {
  width: 88px;
  min-height: 44px;
  padding: 0 20px;
  color: #ffffff;
  border: 0;
  background: transparent;
  font-size: 13px;
  font-weight: 700;
}

.search_btn:hover,
.search_btn:focus-visible {
  color: #ffffff;
  background: var(--el-color-primary-dark-2);
}

@media (max-width: 480px) {
  .search_box :deep(.el-input-group__prepend) {
    display: none;
  }

  .search_box :deep(.el-input__wrapper) {
    border-radius: var(--el-border-radius-base) 0 0 var(--el-border-radius-base);
  }

  .search_box :deep(.el-input-group__append) {
    min-width: 58px;
  }

  .search_btn {
    width: 58px;
    padding: 0 12px;
  }
}
</style>
