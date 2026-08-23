import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

export const CITIES = [
    { id: 'city_01', name: '서울', query: 'Seoul,KR', lat: 37.5665, lon: 126.9780 },
    { id: 'city_02', name: '수원', query: 'Suwon,KR', lat: 37.2636, lon: 127.0286 },
    { id: 'city_03', name: '부산', query: 'Busan,KR', lat: 35.1796, lon: 129.0756 },
    { id: 'city_04', name: '경주', query: 'Gyeongju,KR', lat: 35.8562, lon: 129.2247 },
    { id : 'city_05', name : '인천', query: 'Incheon,KR', lat: 37.4563, lon: 126.7052},
    { id : 'city_06', name : '대전', query: 'Daejeon,KR', lat: 36.3504, lon: 127.3845},
    { id : 'city_07', name : '대구', query: 'Daegu,KR', lat: 35.8714, lon: 128.6014},
    { id : 'city_08', name : '광주', query: 'Gwangju,KR', lat: 35.1595, lon: 126.8526},
    { id : 'city_09', name : '제주', query: 'Jeju,KR', lat: 33.4996, lon: 126.5312},
    { id : 'city_10', name : '강릉', query: 'Gangneung,KR', lat: 37.7519, lon: 128.8761},
];

export const fetchWeatherDataByCoord = async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=kr`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchWeatherData = async (cityQuery) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${api_key}&units=metric&lang=kr`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchForecastDataByCoord = async ({ lat, lon }) => {
    const request_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=kr`;
    const response = await axios.get(request_url);
    return response.data;
};

// API 공식 문서 : https://open-meteo.com/en/docs/air-quality-api#data_sources
export const fetchAirQualityData = async ({ lat, lon }) => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,pm10,us_aqi&hourly=pm2_5,pm10,us_aqi&timezone=GMT&forecast_days=3`;
  const response = await axios.get(url);
  return response.data;
};