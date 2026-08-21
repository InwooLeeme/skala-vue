import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

export const CITIES = [
    { id: 'city_01', name: '서울', query: 'Seoul,KR', lat: 37.5665, lon: 126.9780 },
    { id: 'city_02', name: '수원', query: 'Suwon,KR', lat: 37.2636, lon: 127.0286 },
    { id: 'city_03', name: '부산', query: 'Busan,KR', lat: 35.1796, lon: 129.0756 },
    { id: 'city_04', name: '경주', query: 'Gyeongju,KR', lat: 35.8562, lon: 129.2247 },
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