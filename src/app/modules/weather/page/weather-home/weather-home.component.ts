import { Weather } from 'src/app/models/interfaces/Weather';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html'
})
export class WeatherHomeComponent implements OnInit, OnDestroy {

  // indica que estamos trabalhando com observables
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName: string = 'Manaus';
  weatherData!: Weather;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.initialCityName);
  }

  getWeather(cityName: string):void {
    this.weatherService.getWeatherData(cityName)
    .pipe(
      // passando para o takeUntil a assinatura que queremos nos descrever posteriormente
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        // se po response existe
        response && (this.weatherData = response);
      },
      error: (error) => console.log(error),
    })
  }

  onSubmit(): void {
    this.getWeather(this.initialCityName);
    this.initialCityName = '';
  }

  // por padrão, ficamos subscritos enquanto a aplicação estiver online.
  // devemos nos desinscrever quando mudarmos de tela (rota) para evitar memory leak
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
