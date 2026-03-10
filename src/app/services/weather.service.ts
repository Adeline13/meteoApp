import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';

export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  description: string;
  iconCode: number;
  isDay: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<any>(`${this.geoUrl}?name=${city}&count=1&language=fr&format=json`).pipe(
      switchMap(geoRes => {
        if (!geoRes.results || geoRes.results.length === 0) {
          throw new Error('Ville non trouvée');
        }
        const location = geoRes.results[0];
        return this.http.get<any>(`${this.weatherUrl}?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=relative_humidity_2m`).pipe(
          map(weatherRes => {
            const current = weatherRes.current_weather;
            return {
              city: location.name,
              temp: current.temperature,
              humidity: weatherRes.hourly.relative_humidity_2m[0], // Simplified humidity
              description: this.getWeatherDescription(current.weathercode),
              iconCode: current.weathercode,
              isDay: current.is_day === 1
            };
          })
        );
      })
    );
  }

  private getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Ciel dégagé',
      1: 'Principalement dégagé',
      2: 'Partiellement nuageux',
      3: 'Couvert',
      45: 'Brouillard',
      48: 'Givre',
      51: 'Bruine légère',
      53: 'Bruine modérée',
      55: 'Bruine dense',
      61: 'Pluie légère',
      63: 'Pluie modérée',
      65: 'Pluie forte',
      71: 'Neige légère',
      73: 'Neige modérée',
      75: 'Neige forte',
      80: 'Averses légères',
      81: 'Averses modérées',
      82: 'Averses violentes',
      95: 'Orage',
      96: 'Orage et grêle',
      99: 'Orage et grêle forte'
    };
    return descriptions[code] || 'Inconnu';
  }
}
