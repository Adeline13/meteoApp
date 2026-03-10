import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-card" *ngIf="data" [ngClass]="{'day': data.isDay, 'night': !data.isDay}">
      <div class="card-body">
        <h2 class="city-name">{{ data.city }}</h2>
        <div class="weather-info">
          <div class="temp-container">
            <span class="temperature">{{ data.temp }}°C</span>
            <span class="description">{{ data.description }}</span>
          </div>
          <div class="weather-icon">
            <span class="emoji">{{ getEmoji(data.iconCode) }}</span>
          </div>
        </div>
        <div class="details">
          <div class="detail-item">
            <span class="label">Humidité</span>
            <span class="value">{{ data.humidity }}%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .weather-card {
      max-width: 400px;
      margin: 20px auto;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      color: white;
      transition: all 0.5s ease;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .weather-card.day {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    .weather-card.night {
      background: linear-gradient(135deg, #243949 0%, #517fa4 100%);
    }
    .card-body {
      padding: 30px;
      text-align: center;
    }
    .city-name {
      margin: 0;
      font-size: 2rem;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .weather-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 30px 0;
    }
    .temperature {
      display: block;
      font-size: 4rem;
      font-weight: 700;
    }
    .description {
      font-size: 1.2rem;
      opacity: 0.8;
    }
    .emoji {
      font-size: 5rem;
    }
    .details {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
    .detail-item {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
    .value {
      font-size: 1.2rem;
      font-weight: bold;
    }
  `]
})
export class WeatherCardComponent {
  @Input() data?: WeatherData;

  getEmoji(code: number): string {
    const emojis: { [key: number]: string } = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌦️', 55: '🌦️',
      61: '🌧️', 63: '🌧️', 65: '🌧️',
      71: '❄️', 73: '❄️', 75: '❄️',
      80: '🌦️', 81: '🌦️', 82: '🌧️',
      95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    return emojis[code] || '🌡️';
  }
}
