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
    <template v-if="city">
      <div class="detail_header">
        <div>
          <div class="detail_title_row">
            <h1>{{ city.name }} · {{ city.status }}</h1>
          </div>
          <p>현재 날씨와 반려견 산책 가이드</p>
        </div>
        <el-button class="back_btn" plain @click="router.push('/')">대시보드로 돌아가기</el-button>
      </div>

      <BaseDashboardCard title="현재 날씨 상세">
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

      <BaseDashboardCard title="반려견 산책 가이드">
        <div class="walk_guide_grid">
          <section
            class="walk_summary"
            :class="{ caution: city.temp >= 28 || city.data.wind_speed >= 5 }"
          >
            <el-tag
              :type="city.temp >= 28 || city.data.wind_speed >= 5 ? 'warning' : 'success'"
              effect="light"
              round
            >
              {{ city.temp >= 28 || city.data.wind_speed >= 5 ? '짧은 산책을 권장해요' : '지금 산책하기 좋아요' }}
            </el-tag>
            <h2>
              {{ city.temp >= 28 || city.data.wind_speed >= 5
                ? '기온이 내려간 뒤 가볍게 걸어보세요'
                : '현재 날씨라면 편안하게 걸을 수 있어요' }}
            </h2>
            <p>
              {{ city.temp >= 28
                ? '기온이 높은 시간에는 물을 챙기고 실제 지면 온도를 확인해 주세요.'
                : '강수 예보와 미세먼지 데이터를 연결하면 더 정확한 시간 추천을 받을 수 있습니다.' }}
            </p>
            <div class="walk_facts">
              <el-tag effect="plain">기온 {{ displayTemp }}{{ configStore.unitSymbol }}</el-tag>
              <el-tag effect="plain">바람 {{ displayWindSpeed }} {{ configStore.windSpeedUnitLabel }}</el-tag>
              <el-tag effect="plain">습도 {{ city.data.humidity }}%</el-tag>
            </div>
          </section>

          <aside
            class="score_panel"
            :class="{ caution: city.temp >= 28 || city.data.wind_speed >= 5 }"
          >
            <span class="score_label">현재 환경 점수</span>
            <strong>{{ city.temp >= 28 || city.data.wind_speed >= 5 ? 58 : 84 }}</strong>
            <span class="score_total">/ 100</span>
            <el-progress
              :percentage="city.temp >= 28 || city.data.wind_speed >= 5 ? 58 : 84"
              :show-text="false"
              :stroke-width="8"
              :status="city.temp >= 28 || city.data.wind_speed >= 5 ? 'warning' : 'success'"
            />
            <p>현재 기온·바람을 기준으로 계산한 MVP 점수입니다.</p>
          </aside>
        </div>

        <h3 class="timeline_title">시간대별 산책 가이드</h3>
        <div class="walk_timeline">
          <article class="time_slot active">
            <span>현재</span>
            <strong>{{ city.temp >= 28 || city.data.wind_speed >= 5 ? 58 : 84 }}점</strong>
            <el-tag
              :type="city.temp >= 28 || city.data.wind_speed >= 5 ? 'warning' : 'success'"
              size="small"
              effect="light"
            >
              {{ city.temp >= 28 || city.data.wind_speed >= 5 ? '짧게' : '추천' }}
            </el-tag>
          </article>
          <article class="time_slot pending">
            <span>오늘 다음 시간</span>
            <strong>--</strong>
            <small>예보 연결 예정</small>
          </article>
          <article class="time_slot pending">
            <span>내일 오전</span>
            <strong>--</strong>
            <small>예보 연결 예정</small>
          </article>
        </div>

        <el-alert
          class="data_notice"
          title="시간별 추천과 미세먼지 점수는 Forecast·Air Pollution API 연결 후 활성화됩니다."
          type="info"
          :closable="false"
          show-icon
        />
      </BaseDashboardCard>
    </template>

    <BaseDashboardCard v-else-if="store.isLoading" title="불러오는 중">
      <el-skeleton :rows="6" animated />
    </BaseDashboardCard>

    <BaseDashboardCard v-else title="도시를 찾을 수 없습니다">
      <el-empty :description="`요청한 도시(${route.params.cityId})의 날씨 정보를 찾을 수 없습니다.`" />
      <div class="empty_action">
        <el-button type="primary" @click="router.push('/')">도시 다시 선택하기</el-button>
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

.detail_header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 12px 4px 4px;
}

.detail_title_row {
  display: flex;
  align-items: center;
  gap: 9px;
}

.detail_title_row h1 {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: clamp(25px, 4vw, 34px);
  font-weight: 750;
  letter-spacing: -0.04em;
}

.detail_header p:last-child {
  margin: 7px 0 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.detail_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail_item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 15px;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
}

.detail_label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.detail_value {
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 700;
}

.walk_guide_grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(210px, 0.7fr);
  gap: 12px;
}

.walk_summary {
  min-height: 220px;
  padding: 22px;
  border-radius: 16px;
  color: var(--el-color-primary-dark-2);
  background: linear-gradient(135deg, var(--el-color-primary-light-9), #dcefe3);
}

.walk_summary.caution {
  color: var(--el-color-warning-dark-2);
  background: linear-gradient(135deg, var(--el-color-warning-light-9), #f8e8c8);
}

.walk_summary h2 {
  max-width: 560px;
  margin: 22px 0 8px;
  color: currentColor;
  font-size: clamp(21px, 3vw, 28px);
  font-weight: 750;
  letter-spacing: -0.035em;
}

.walk_summary p {
  max-width: 620px;
  margin: 0 0 18px;
  color: currentColor;
  font-size: 13px;
  opacity: 0.86;
}

.walk_facts {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.score_panel {
  padding: 20px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 16px;
  background: var(--el-fill-color-lighter);
}

.score_label {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.score_panel strong {
  display: inline-block;
  margin: 10px 4px 12px 0;
  color: var(--el-color-primary);
  font-size: 44px;
  font-weight: 750;
  letter-spacing: -0.05em;
}

.score_panel.caution strong {
  color: var(--el-color-warning-dark-2);
}

.score_total {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.score_panel p {
  margin: 16px 0 0;
  color: var(--el-text-color-secondary);
  font-size: 11px;
}

.timeline_title {
  margin: 22px 0 10px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  font-weight: 700;
}

.walk_timeline {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.time_slot {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 116px;
  padding: 14px;
  border: 1px solid var(--el-border-color-light);
  border-radius: var(--el-border-radius-base);
  background: var(--el-bg-color);
}

.time_slot.active {
  border-color: var(--el-color-primary-light-5);
  background: var(--el-color-primary-light-9);
}

.time_slot.pending {
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-lighter);
}

.time_slot span,
.time_slot small {
  font-size: 11px;
}

.time_slot strong {
  color: var(--el-text-color-primary);
  font-size: 19px;
  font-weight: 700;
}

.time_slot .el-tag {
  align-self: flex-start;
}

.data_notice {
  margin-top: 12px;
}

.empty_action {
  display: flex;
  justify-content: center;
}

.no_result {
  margin: 0;
  padding: 28px 16px;
  text-align: center;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.back_btn {
  font-size: 13px;
  font-weight: 600;
}

.back_btn:hover {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-5);
  background: var(--el-color-primary-light-9);
}

@media (max-width: 560px) {
  .detail_header {
    align-items: flex-start;
    flex-direction: column;
  }

  .detail_grid {
    grid-template-columns: 1fr;
  }

  .walk_guide_grid,
  .walk_timeline {
    grid-template-columns: 1fr;
  }
}
</style>
