<script setup>
import { RouterLink } from 'vue-router'
import { ElLink } from 'element-plus'
import 'element-plus/theme-chalk/el-link.css'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <main class="practice-section">
    <section class="page_intro">
      <h1>개인 실습 기록</h1>
      <p>프로젝트를 진행하며 추가로 학습하고 실제 코드에 적용한 내용을 정리했습니다.</p>
    </section>

    <section class="practice_topic" aria-labelledby="async-practice-title">
      <div class="topic_header">
        <div>
          <h2 id="async-practice-title">비동기 API 처리</h2>
          <p>여러 요청을 함께 처리하는 두 방식과 현재 프로젝트의 선택을 비교했습니다.</p>
        </div>
        <el-tag type="success" effect="light" round>Promise.allSettled 적용</el-tag>
      </div>

      <section class="comparison_grid" aria-label="Promise 방식 비교">
        <BaseDashboardCard title="Promise.all">
          <el-tag type="info" effect="plain" size="small">전체 성공 필요</el-tag>
          <p class="comparison_text">모든 요청의 결과가 반드시 필요할 때 사용합니다.</p>
          <strong class="comparison_result">하나가 실패하면 전체 요청이 실패합니다.</strong>
        </BaseDashboardCard>

        <BaseDashboardCard title="Promise.allSettled">
          <el-tag type="success" effect="light" size="small">일부 성공 허용</el-tag>
          <p class="comparison_text">각 요청의 성공과 실패를 따로 확인할 때 사용합니다.</p>
          <strong class="comparison_result"
            >일부가 실패해도 성공한 결과를 사용할 수 있습니다.</strong
          >
        </BaseDashboardCard>
      </section>

      <BaseDashboardCard title="현재 프로젝트의 선택">
        <el-alert
          title="Promise.allSettled을 선택했습니다."
          description="도시 한 곳이나 외부 API 하나가 실패해도 사용 가능한 날씨와 대기질 정보는 계속 제공하기 위해서입니다."
          type="success"
          :closable="false"
          show-icon
        />

        <div class="choice_summary">
          <p>기본 도시 조회에서는 성공한 도시의 날씨 카드를 계속 표시합니다.</p>
          <p>상세 조회에서는 예보와 대기질 중 성공한 데이터를 계속 표시합니다.</p>
        </div>
      </BaseDashboardCard>

      <footer class="reference_section" aria-labelledby="async-reference-title">
        <h3 id="async-reference-title">참고한 자료</h3>
        <div class="reference_links">
          <ElLink
            href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
            target="_blank"
            rel="noopener noreferrer"
            type="primary"
          >
            MDN Web Docs - Promise.all()
          </ElLink>
          <ElLink
            href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled"
            target="_blank"
            rel="noopener noreferrer"
            type="primary"
          >
            MDN Web Docs - Promise.allSettled()
          </ElLink>
        </div>
      </footer>
    </section>

    <RouterLink to="/" class="back_btn">메인 대시보드로 돌아가기</RouterLink>
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

.page_intro {
  width: 100%;
  padding: 2px 2px 16px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.page_intro h1 {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: clamp(23px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.page_intro p,
.topic_header p {
  margin: 7px 0 0;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.practice_topic {
  display: grid;
  gap: 16px;
  width: 100%;
}

.topic_header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 4px 2px 0;
}

.topic_header h2 {
  margin: 0;
  color: var(--el-text-color-primary);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.comparison_grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
}

.comparison_text {
  margin: 14px 0 7px;
  color: var(--el-text-color-regular);
  font-size: 13px;
  line-height: 1.6;
}

.comparison_result {
  color: var(--el-text-color-primary);
  font-size: 13px;
  line-height: 1.6;
}

.choice_summary {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.choice_summary p {
  margin: 0;
  padding: 11px 13px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: var(--el-border-radius-small);
  color: var(--el-text-color-regular);
  background: var(--el-fill-color-lighter);
  font-size: 12px;
  line-height: 1.5;
}

.reference_section {
  padding: 16px 2px 0;
  border-top: 1px solid var(--el-border-color-lighter);
}

.reference_section h3 {
  margin: 0 0 9px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  font-weight: 700;
}

.reference_links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
}

.reference_links .el-link {
  font-size: 12px;
}

.back_btn {
  align-self: flex-start;
  padding: 9px 14px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-small);
  color: var(--el-text-color-regular);
  background: var(--el-bg-color);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.back_btn:hover {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-5);
  background: var(--el-color-primary-light-9);
}

@media (max-width: 640px) {
  .topic_header {
    align-items: flex-start;
    flex-direction: column;
  }

  .comparison_grid {
    grid-template-columns: 1fr;
  }
}
</style>
