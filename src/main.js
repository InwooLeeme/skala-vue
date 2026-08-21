import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  ElAlert,
  ElButton,
  ElButtonGroup,
  ElCard,
  ElEmpty,
  ElInput,
  ElProgress,
  ElSkeleton,
  ElTag,
} from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-alert.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-button-group.css'
import 'element-plus/theme-chalk/el-card.css'
import 'element-plus/theme-chalk/el-empty.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-progress.css'
import 'element-plus/theme-chalk/el-skeleton.css'
import 'element-plus/theme-chalk/el-tag.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const elementComponents = [
  ElAlert,
  ElButton,
  ElButtonGroup,
  ElCard,
  ElEmpty,
  ElInput,
  ElProgress,
  ElSkeleton,
  ElTag,
]

elementComponents.forEach((component) => app.use(component))

app.mount('#app')
