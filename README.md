# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 과제 수행 사항

### 1차 과제
- 날씨(Mockup) 데이터를 이용해서 날씨 앱 만들기

#### 1차 과제 수행 시 추가한 데이터

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