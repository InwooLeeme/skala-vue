# skala-vue

This template should help get you started developing with Vue 3 in Vite.


## 과제 수행 사항

- 날씨(Mockup) 데이터를 이용해서 날씨 앱 만들기

### 1차 실습 수행 시 추가한 데이터

```json
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777452300,
      "temp": 287.95,
      "feels_like": 286.75,
      "pressure": 1024,
      "humidity": 48,
      "dew_point": 277.2,
      "uvi": 2.36,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 7.41,
      "wind_deg": 70,
      "pop": 0,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ],
	  "alerts": [
		"8B46C632-DCA7-44D7-8BDF-02445621BAFF",
		"29F58A35-BB91-4A73-9F46-9FC64BDF604F",
		...
	]
    },
	...
  ],
"next": "https://api.openweathermap.org/data/4.0/onecall/timeline/15min?lat=51.5000&lon=-0.1000&start=1777497300&appid={API key}"
}
```
[OpenWeatherAPI](https://openweathermap.org/api/one-call-4?collection=one_call_api)의 API Response를 참고해서
data객체 안의 습도(humidity), 구름양(clouds), 풍속(wind_speed)를 추가하였습니다.

기본 예시에 없던 경주 데이터를 추가해 총 4개 도시를 비교할 수 있도록 했으며, 상세보기 버튼을 누르면 해당 도시의 이름과 현재 상태를 `window.alert`로 확인할 수 있게 만들었다.

### 2차 실습시 본인만의 반응형 상태 변수, Computed, Watcher 추가한 사항

검색 결과만 필터링하는 데서 끝내지 않고 `suggestions` Computed를 추가했다. 사용자가 검색어를 입력하면 일치하는 도시를 최대 5개까지 검색창 아래에 추천 목록으로 표시했다.

검색어를 한 번에 지울 수 있는 초기화 버튼을 추가했고, 선택된 카드는 테두리와 배경색을 바꿔 현재 선택 상태를 확인할 수 있도록 했다. 맑음, 비, 구름, 소나기 상태에도 서로 다른 글자 색상을 적용해 날씨 상태를 빠르게 구분할 수 있게 했다.

#### 이후 실습에서 변경된 부분

3차 실습에서 SearchBar를 단순한 입력 컴포넌트로 분리하면서 suggestions와 추천 목록 UI는 제외하였습니다.

### 3차 실습 : 본인의 Mockup 부분에서 추가로 Component하거나 위의 Component를 더 분리하여 추가 Component 만들기

### 4차 실습 : 상기 정의된 view 이외에 본인의 추가 view를 작성하고 Routing한다.

필수 화면 외에 /stats경로와 WeatherStatsView를 추가하였다. 이 화면에선 전체 도시의 평균 기온, 평균 습도, 평균 풍속, 집계 도시 수를 계산하고
최고, 최저 기온 도시도 함께 보여주도록 작성하였습니다.

### 5차 실습 : 수행 시 본인만의 추가 Store 작성
```javascript
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const unitSymbolStore = defineStore('unit', () => {
    const unit = ref('celsius');
    const windSpeedUnit = ref('ms');

    const unitSymbol = computed(() => (unit.value === 'fahrenheit' ? '°F' : '°C'));
    const windSpeedUnitLabel = computed(() => (windSpeedUnit.value === 'kmh' ? 'km/h' : 'm/s'));

    const toggleUnit = () => {
        unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius';
    };

    const toggleWindSpeedUnit = () => {
        windSpeedUnit.value = windSpeedUnit.value === 'ms' ? 'kmh' : 'ms';
    };

    return { unit, windSpeedUnit, unitSymbol, windSpeedUnitLabel, toggleUnit, toggleWindSpeedUnit };
});
```

과제의 요구사항인 온도에 관한 변수와 제가 선택해서 추가한 풍속(windSpeed)에 관한 변수를 추가하였습니다.
windSpeedUnit 상태, windSpeedUnitLable Computed, toggleWindSpeedUnit액션을 추가해서 m/s와 km/h를 전환할 수 있도록 하였습니다.

메인 날씨 카드와 상세 페이지에 각각 distplayTemp, displayWindSpeed Computed를 두어 Store설정이 바뀌면 표시 값도 자동으로 다시 계산되게
하였습니다.

### 6차 실습 : 기타 외부 API를 추가하여 Application 기능 확장 부분

API 호출 코드를 화면 컴포넌트에 작성하지 않고 src/api/index.js에 분리하였습니다.
추가적으로 API가 늘어난다면 유지보수를 수월하게 하기 위해 이렇게 작성하였습니다.

날씨 데이터는 별도의 weatherStore에서 관리하도록 하였습니다.


### 7차 실습 : Hands on - Weather UI Library 적용 부분

일반 html 태그로 작성했던 기존 template의 코드를 Element-plus의 태그를 이용해서 재작성하였습니다.

사용한 Element-plus
| 컴포넌트 | 적용 위치 | 적용 내용 |
| --- | --- | --- |
| `ElCard` | `BaseDashboardCard.vue` | 검색, 날씨 목록, 통계, 상세 정보를 공통 카드 형태로 표시 |
| `ElInput` | `SearchBar.vue` | 도시 검색 입력창과 검색어 초기화 기능 구현 |
| `ElButton` | 검색창, 날씨 카드, 상세 페이지 | 검색, 상세보기, 페이지 이동 버튼에 적용 |
| `ElButtonGroup` | `UnitToggler.vue` | 온도와 풍속 단위 전환 버튼을 하나의 그룹으로 구성 |
| `ElTag` | `WeatherCard.vue`, `WeatherDetailView.vue` | 기온, 풍속, 습도, 구름량과 산책 상태를 배지 형태로 표시 |
| `ElSkeleton` | 홈, 상세 페이지 | API 데이터를 가져오는 동안 로딩 화면 표시 |
| `ElEmpty` | 홈, 상세 페이지 | 검색 결과 또는 도시 정보가 없을 때 안내 화면 표시 |
| `ElProgress` | 상세 페이지 | 반려견 산책 환경 점수를 진행률 형태로 표시 |
| `ElAlert` | 상세 페이지 | 아직 연결되지 않은 시간별 예보와 대기질 기능 안내 |