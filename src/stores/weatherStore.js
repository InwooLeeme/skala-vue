import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    fetchWeatherData,
    fetchForecastDataByCoord,
    fetchAirQualityData,
    CITIES,
} from '@/api';

export const weatherStore = defineStore('weather', () => {
    const cities = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const detailByCity = ref({});
    const detailLoading = ref(false);
    const detailError = ref(null);

    const toCityWeather = (city, data) => ({
        id : city.id,
        name : city.name,
        lat : data.coord.lat,
        lon : data.coord.lon,
        temp : Math.round(data.main.temp),
        status : data.weather[0].description,
        data : {
            feels_like : data.main.feels_like,
            clouds : data.clouds.all,
            humidity : data.main.humidity,
            wind_speed : data.wind.speed,
        },
    });

    const fetchAll = async () => {
        isLoading.value = true;
        error.value = null;
        try{
            const results = [];
            for(const city of CITIES){
                const data = await fetchWeatherData(city.query);
                results.push(toCityWeather(city, data));
            }
            cities.value = results;
        } catch(e) {
            error.value = e;
        }
        finally{
            isLoading.value = false;
        }
    };

    const changeTimeToTimestamp = (time) => {
        const utcTime = `${time}Z`;
        return Math.floor(new Date(utcTime).getTime() / 1000);
    };

    const findAirQuality = (airData, forecastTimestamp) => {
        if (airData === null || airData.hourly === undefined) {
            return null;
        }

        for (let index = 0; index < airData.hourly.time.length; index++) {
            const airTimestamp = changeTimeToTimestamp(airData.hourly.time[index]);

            if (airTimestamp === forecastTimestamp) {
                return {
                    pm25: airData.hourly.pm2_5[index],
                    pm10: airData.hourly.pm10[index],
                    aqi: airData.hourly.us_aqi[index],
                };
            }
        }

        return null;
    };

    const makeForecastSlots = (forecastData, airData) => {
        const slots = [];

        if (forecastData === null) {
            return slots;
        }

        for (const item of forecastData.list) {
            const airQuality = findAirQuality(airData, item.dt);

            let pm25 = null;
            let pm10 = null;
            let aqi = null;

            if (airQuality !== null) {
                pm25 = airQuality.pm25;
                pm10 = airQuality.pm10;
                aqi = airQuality.aqi;
            }

            slots.push({
                timestamp: item.dt,
                temperature: item.main.temp,
                feelsLike: item.main.feels_like,
                humidity: item.main.humidity,
                rainProbability: item.pop,
                windSpeed: item.wind.speed,
                weather: item.weather[0].description,
                pm25: pm25,
                pm10: pm10,
                aqi: aqi,
            });
        }

        return slots;
    };

    const makeCurrentAir = (airData) => {
        if (airData === null || airData.current === undefined) {
            return null;
        }

        return {
            pm25: airData.current.pm2_5,
            pm10: airData.current.pm10,
            aqi: airData.current.us_aqi,
        };
    };

    const fetchCityDetail = async (city) => {
        detailLoading.value = true;
        detailError.value = null;

        let forecastData = null;
        let airData = null;
        let forecastError = null;
        let airQualityError = null;

        try {
            forecastData = await fetchForecastDataByCoord({
                lat: city.lat,
                lon: city.lon,
            });
        } catch(e) {
            forecastError = '시간별 날씨 예보를 불러오지 못했습니다.';
        }

        try {
            airData = await fetchAirQualityData({
                lat: city.lat,
                lon: city.lon,
            });
        } catch(e) {
            airQualityError = '대기질 정보를 불러오지 못했습니다.';
        }

        let timezoneOffset = 0;

        if (forecastData !== null) {
            timezoneOffset = forecastData.city.timezone;
        }

        detailByCity.value[city.id] = {
            slots: makeForecastSlots(forecastData, airData),
            currentAir: makeCurrentAir(airData),
            timezoneOffset: timezoneOffset,
            sourceErrors: {
                forecast: forecastError,
                airQuality: airQualityError,
            },
        };

        if (forecastData === null && airData === null) {
            detailError.value = '상세 날씨와 대기질 정보를 불러오지 못했습니다.';
        }

        detailLoading.value = false;
    };

    return {
        cities,
        isLoading,
        error,
        detailByCity,
        detailLoading,
        detailError,
        fetchAll,
        fetchCityDetail,
    };
});
