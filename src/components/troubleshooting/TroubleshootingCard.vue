<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';

defineProps({
  entry: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseDashboardCard class="troubleshooting_card" :title="entry.title">
    <div class="entry_meta">
      <div class="tag_group">
        <el-tag type="info" effect="plain" size="small">{{ entry.category }}</el-tag>
        <el-tag :type="entry.statusType" effect="light" size="small">{{ entry.status }}</el-tag>
      </div>
      <time class="entry_date" :datetime="entry.date">{{ entry.date }}</time>
    </div>

    <section class="entry_section">
      <h3 class="section_label">문제 상황</h3>
      <p class="entry_text">{{ entry.symptom }}</p>
    </section>

    <section class="entry_section">
      <h3 class="section_label">원인</h3>
      <ol class="cause_list">
        <li v-for="cause in entry.causes" :key="cause">{{ cause }}</li>
      </ol>
    </section>

    <section class="entry_section">
      <h3 class="section_label">{{ entry.status === '해결' ? '해결 과정' : '해결 방향' }}</h3>
      <p class="resolution_box" :class="{ pending: entry.status !== '해결' }">
        {{ entry.resolution }}
      </p>
    </section>

    <section class="entry_section lesson_section">
      <h3 class="section_label">배운 점</h3>
      <p class="entry_text">{{ entry.lesson }}</p>
    </section>
  </BaseDashboardCard>
</template>

<style scoped>
.troubleshooting_card {
  overflow: hidden;
}

.entry_meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.tag_group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.entry_date {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--el-text-color-secondary);
}

.entry_section + .entry_section {
  margin-top: 18px;
}

.section_label {
  margin: 0 0 7px;
  font-size: 12px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}

.entry_text {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.cause_list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
}

.cause_list li {
  padding-left: 2px;
  color: var(--el-text-color-regular);
  font-size: 13px;
  line-height: 1.55;
}

.cause_list li::marker {
  color: var(--el-color-primary);
  font-weight: 700;
}

.resolution_box {
  margin: 0;
  padding: 12px 14px;
  border-left: 3px solid var(--el-color-primary);
  border-radius: 0 var(--el-border-radius-small) var(--el-border-radius-small) 0;
  color: var(--el-color-primary-dark-2);
  background: var(--el-color-primary-light-9);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.6;
}

.resolution_box.pending {
  border-left-color: var(--el-color-warning);
  color: var(--el-color-warning-dark-2);
  background: var(--el-color-warning-light-9);
}

.lesson_section {
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
}

@media (max-width: 560px) {
  .entry_meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
