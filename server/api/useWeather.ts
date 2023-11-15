import { ref, onMounted } from 'vue';


interface weatherData {
        
        current: any ;
        hourly: any;
        daily: any;
}

export default function useWeather() {
    const weatherData = ref<weatherData | null>(null);
   
    const fetchweatherData = async() => {
    try {
        const response = await fetch('/api/weather');
        const data: weatherData = await response.json();

        weatherData.value = data 
    } catch (error) {
    console.error('Error fetching weather data', error);
    }
};

onMounted(() => {
    fetchweatherData();
});

return {weatherData}
}