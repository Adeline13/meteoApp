import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <input 
        type="text" 
        [(ngModel)]="city" 
        (keyup.enter)="onSearch()" 
        placeholder="Rechercher une ville..."
        class="search-input"
      />
      <button (click)="onSearch()" class="search-button">
        <span class="search-icon">🔍</span>
      </button>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      gap: 10px;
      width: 100%;
      max-width: 500px;
      margin: 20px auto;
    }
    .search-input {
      flex: 1;
      padding: 12px 20px;
      border-radius: 25px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: white;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }
    .search-input:focus {
      border-color: #00d2ff;
      box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
    }
    .search-button {
      padding: 10px 20px;
      border-radius: 25px;
      border: none;
      background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
      color: white;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .search-button:hover {
      transform: scale(1.05);
    }
  `]
})
export class SearchBarComponent {
  city: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    if (this.city.trim()) {
      this.search.emit(this.city.trim());
    }
  }
}
