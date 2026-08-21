import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchWeatherData, CITIES } from '@/api';

export const weatherStore = defineStore('weather', () => {
    const cities = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const toCityWeather = (city, data) => ({
        id : city.id,
        name : city.name,
        temp : Math.round(data.main.temp),
        status : data.weather[0].description,
        data : {
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

    return {cities, isLoading, error, fetchAll };
});