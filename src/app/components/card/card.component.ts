import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() img: string = '';
  @Input() type: string = '';

  @Output() removeCard: EventEmitter<number> = new EventEmitter<number>();

  isHovered: boolean = false;

  toggleHover(state: boolean): void {
    this.isHovered = state;
  }

  onDelete(): void {
    this.removeCard.emit(this.id);
  }
}
