<template>
<div class="bg-slate-800 pb- h-300" :class="{ collapsed: isCollapsed }">
    <div class= " bg-gray-300 p-4 rounded-lg shadow-md w-2/3 mx-auto">
      <div class="flex justify-center">
        <input
          type="text"
          id="searchInput"
          class="w-full px-4 py-2 rounded-lg border bg-gray-#715b5fs focus:outline-none"
          placeholder="Search City..."
          v-model="searchCity"
        />
        <button @click="searchWeather" class="text-white ml-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600">
          Search
        </button>
      </div>
      <div class="text-center">
        <p class=" text-white w-full px-4 py-2 rounded-lg border bg-slate-700 focus:outline-none">{{ currentDate }}</p>
      </div>

      <div class="flex flex-col items-center mt-3 mb-3">
        <img
          class="weather-icon w-32 h-32 rounded-full shadow-lg"
          :src="weatherIcon"
          alt="Weather Icon"
        />
        <p class="weather-condition mt-2 font-bold" id="weather-condition">{{ weatherCondition }}</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="info  bg-gray-300 py-2 px-4 rounded-lg mt-3">
          <p class="info-label">Temperature</p>
          <p class="info-value" id="temperature">{{ temperature }}</p>
        </div>
        <div class="info  bg-gray-3000 py-2 px-4 rounded-lg mt-3">
          <p class="info-label">Humidity</p>
          <p class="info-value">50%</p>
        </div>
        <div class="info   bg-gray-300 py-2 px-4 rounded-lg mt-3">
          <p class="info-label">Wind</p>
          <p class="info-value">10 mph</p>
        </div>
        <div class="info   bg-gray-300 py-2 px-4 rounded-lg mt-3">
          <p class="info-label">Test</p>
          <p class="info-value" id="test-value">-</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Dashboard',
  
  props: ['isCollapsed'], // Receive the prop isCollapsed
// You can also use a computed property to determine the class based on the isCollapsed prop
computed: {
    // Use this class when isCollapsed is true
    collapsedDashboard() {
      return this.isCollapsed ? 'collapsed' : '';
    },
  },
  setup() {
    const currentDate = ref('');
    const weatherIcon = ref('sun.png');
    const weatherCondition = ref('');
    const temperature = ref('');
    const searchCity = ref('Japan');
    
    // lijstnvan landen en coordinaten
    const coordinates = {
      'Bahrain': { latitude: 26.0667, longitude: 50.5577 },
      'Saudi Arabia': { latitude: 23.8859, longitude: 45.0792 },
      'Japan': {latitude:34.807824396707396 , longitude: 136.61479768631446},
      // Add more countries here a bro
    };

    const fetchWeatherData = (cityName) => {
      const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';
      const selectedVariables = ['temperature_2m', 'weathercode'];

      const { latitude, longitude } = coordinates[cityName];
      const apiUrl = `${weatherApiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${selectedVariables.join(',')}`;

      return fetch(apiUrl)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    };

    const updateWeatherDisplay = (data) => {
      if (data && data.hourly && data.hourly.time && data.hourly.weathercode && data.hourly.temperature_2m) {
        const date = new Date(data.hourly.time[0]);
        currentDate.value = date.toDateString();
        weatherIcon.value = 'sun.png';
        weatherCondition.value = getWeatherCondition(data.hourly.weathercode[0]);
        temperature.value = data.hourly.temperature_2m[0] + '°C';
      } else {
        currentDate.value = 'Data not available';
        weatherCondition.value = 'Data not available';
        temperature.value = 'Data not available';
      }
    };

    const getWeatherCondition = (weatherCode) => {
      const weatherConditions = {
        0: 'Clear',
        1: 'Partly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Rime Fog',
        71: 'Slight Snow',
        73: 'Regular Snow',
        75: 'Heavy Snow',
      };
      return weatherConditions[weatherCode] || 'Unknown';
    };

    const searchWeather = () => {
      console.log(searchCity.value)
      fetchWeatherData(searchCity.value)
        .then((data) => {
          updateWeatherDisplay(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    };

    return {
      currentDate,
      weatherIcon,
      weatherCondition,
      temperature,
      searchCity,
      searchWeather,
    };
  },
};
</script>