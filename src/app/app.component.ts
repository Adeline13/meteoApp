import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherService, WeatherData } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, WeatherCardComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Météo Premium 🌦️</h1>
        <p>Previsions précises via Open-Meteo</p>
      </header>

      <main>
        <app-search-bar (search)="onSearch($event)"></app-search-bar>
        
        <div *ngIf="loading" class="loader">Chargement...</div>
        <div *ngIf="error" class="error-message">{{ error }}</div>
        
        <app-weather-card *ngIf="weatherData && !loading" [data]="weatherData"></app-weather-card>
      </main>

      <footer>
        <p>&copy; 2024 WeatherApp - Open Source Data</p>
      </footer>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherData?: WeatherData;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  onSearch(city: string) {
    this.loading = true;
    this.error = '';
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Impossible de trouver cette ville. Veuillez réessayer.";
        this.loading = false;
      }
    });
  }
}
