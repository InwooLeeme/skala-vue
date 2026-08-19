
<script setup>

import { ref } from 'vue';


const weatherList = ref([
  {
    id : 'city_01', name : '서울', temp : 28, status : '맑음', 
    data:{
      clouds : 0,
      humidity: 48,
      wind_speed : 8.23, 
    }
  },
  {
    id : 'city_02', name : '수원', temp : 24, status : '비', 
    data:{
      clouds : 22,
      humidity: 52,
      wind_speed : 7.31,
    }
  },
  {
    id : 'city_03', name : '부산', temp : 26, status : '구름', 
    data:{
      clouds : 10,
      humidity: 66,
      wind_speed : 4.2,
    }
  },
  {
    id: 'city_04', name : '경주', temp : 33, status : '소나기',
    data:{
      clouds : 12,
      humidity: 73,
      wind_speed : 3.12,
    }
  }
]);

const input_text = ref('');

const statusMessage = ref('카드를 클릭하거나 검색해보세요.');

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}]상태입니다.`)
}

</script>

<template>
  <main class="practice-section">
    <h1 class="task_title">과제 1 : 날씨(Mockup)</h1>
    <div class="input_container">
      <h1>🔍도시 검색</h1>
      <input type="text" v-model="input_text" @input="" placeholder="검색하고 싶은 도시를 입력하세요" />
      <h3>검색 중인 도시 :{{ input_text }}</h3>
    </div>
    <div class="card_container">
      <h1>지역별 날씨 현황</h1>
      <ul class="weather_list_container" >
        <li v-for="obj in weatherList" :key="obj.id" class = "card" @click="statusMessage = obj.name + '이 선택되었습니다.'">
          <h1>{{ obj.name }} ({{ obj.status }})</h1>
          <button class="detail_btn" @click.stop="showDetail(obj.name, obj.status)" >상세보기</button>
          <div class="temp">현재 기온 : {{ obj.temp }}°C</div>
          <span v-if="obj.temp >= 25" class="badge hot">🔥더움 (25도 이상)</span>
          <span v-else class="badge cold">❄️신선함 (25도 미만)</span>
          <span v-if="obj.data.wind_speed >= 5.0" class="badge fast">💨강풍 {{ obj.data.wind_speed }} m/s</span>
          <span v-else class="badge slow">💨약풍 {{ obj.data.wind_speed }} m/s</span>
          <span v-if="obj.data.humidity >= 60" class="badge humid">💧습함 {{ obj.data.humidity }}%</span>
          <span v-else class="badge dry">💧쾌적 {{ obj.data.humidity }}%</span>
          <span v-if="obj.data.clouds >= 50" class="badge cloudy">☁️흐림 {{ obj.data.clouds }}%</span>
          <span v-else class="badge clear">☁️맑음 {{ obj.data.clouds }}%</span>
        </li>
      </ul>
      <div class="status_container">
        <h2 class="status_bar">{{ statusMessage }}</h2>
      </div>
    </div>
  </main>
</template>

<style scoped>

.practice-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 32px 20px 48px;
  box-sizing: border-box;
  background-color: #f7f9fb;
  color: #000;
}

.practice-section > h1{
  width: 100%;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3e6ea;
  /* font-size: 12px; */
  letter-spacing: 0.08em;
}

.task_title{
  color: #000;
  font-weight: 600;
  font-size: 1.25rem;
}

.input_container,
.card_container{
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 10px;
}

.input_container > h1,
.card_container > h1{
  font-size: 15px;
  font-weight: 700;
  color: #1f2d3d;
}


.input_container input{
  width: 100%;
  padding: 9px 12px;
  box-sizing: border-box;
  border: 1px solid #e3e6ea;
  border-radius: 6px;
  font-size: 14px;
  color: #1f2d3d;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.input_container input:focus{
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
}

.input_container h3{
  margin: 10px 0 0;
  font-size: 12px;
  font-weight: 500;
}

.weather_list_container{
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.status_container{
  width: 100%;
  padding-top: 10px;
  margin-top: 10px;
  justify-content: center;
  display: flex;
  
}

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
