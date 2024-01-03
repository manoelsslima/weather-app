import { Weather } from 'src/app/models/interfaces/Weather';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html'
})
export class WeatherHomeComponent implements OnInit {

  initialCityName: string = 'Manaus';
  weatherData!: Weather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.initialCityName);
  }

  getWeather(cityName: string):void {
    this.weatherService.getWeatherData(cityName)
    .subscribe({
      next: (response) => {
        // se po response existe
        response && (this.weatherData = response);
        console.log(this.weatherData.main.temp);
      },
      error: (error) => console.log(error),
    })
  }
}
