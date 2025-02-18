import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText.emit(inputElement.value.trim().toLowerCase());
  }
}
