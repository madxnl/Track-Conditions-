import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"current": ["temperature_2m", "is_day", "rain", "showers", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
	"hourly": ["temperature_2m", "precipitation_probability", "precipitation", "rain", "showers", "cloud_cover_mid", "wind_speed_10m", "wind_direction_10m", "temperature_80m"],
	"daily": ["temperature_2m_max", "temperature_2m_min", "sunset"]
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature2m: current.variables(0)!.value(),
		isDay: current.variables(1)!.value(),
		rain: current.variables(2)!.value(),
		showers: current.variables(3)!.value(),
		cloudCover: current.variables(4)!.value(),
		windSpeed10m: current.variables(5)!.value(),
		windDirection10m: current.variables(6)!.value(),
		windGusts10m: current.variables(7)!.value(),
	},
	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		precipitationProbability: hourly.variables(1)!.valuesArray()!,
		precipitation: hourly.variables(2)!.valuesArray()!,
		rain: hourly.variables(3)!.valuesArray()!,
		showers: hourly.variables(4)!.valuesArray()!,
		cloudCoverMid: hourly.variables(5)!.valuesArray()!,
		windSpeed10m: hourly.variables(6)!.valuesArray()!,
		windDirection10m: hourly.variables(7)!.valuesArray()!,
		temperature80m: hourly.variables(8)!.valuesArray()!,
	},
	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2mMax: daily.variables(0)!.valuesArray()!,
		temperature2mMin: daily.variables(1)!.valuesArray()!,
		sunset: daily.variables(2)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.temperature2m[i],
		weatherData.hourly.precipitationProbability[i],
		weatherData.hourly.precipitation[i],
		weatherData.hourly.rain[i],
		weatherData.hourly.showers[i],
		weatherData.hourly.cloudCoverMid[i],
		weatherData.hourly.windSpeed10m[i],
		weatherData.hourly.windDirection10m[i],
		weatherData.hourly.temperature80m[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toISOString(),
		weatherData.daily.temperature2mMax[i],
		weatherData.daily.temperature2mMin[i],
		weatherData.daily.sunset[i]
	);
}
