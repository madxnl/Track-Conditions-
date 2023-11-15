<template>
  <div>
    <h1>Weather Forecast</h1>

    <!-- Display your weather data here using the Composition API -->
    <div v-if="weatherData">
      <!-- Example: Display current temperature -->
      <p>Current Temperature: {{ weatherData.current.temperature2m }}°C</p>

      <!-- Example: Display hourly forecast -->
      <ul v-if="weatherData.hourly.time.length">
        <li v-for="(time, index) in weatherData.hourly.time" :key="index">
          {{ time.toISOString() }} - Temperature: {{ weatherData.hourly.temperature2m[index] }}°C
          <!-- Add more details as needed -->
        </li>
      </ul>

      <!-- Example: Display daily forecast -->
      <ul v-if="weatherData.daily.time.length">
        <li v-for="(time, index) in weatherData.daily.time" :key="index">
          {{ time.toISOString() }} - Max Temperature: {{ weatherData.daily.temperature2mMax[index] }}°C
          <!-- Add more details as needed -->
        </li>
      </ul>
    </div>
    
    <!-- Add loading/error handling if needed -->
  </div>
</template>

<script setup lang="ts">
import useWeather from 'server/api/useWeather.ts';

const { weatherData } = useWeather();
</script>

  