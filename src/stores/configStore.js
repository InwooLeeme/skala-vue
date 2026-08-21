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
