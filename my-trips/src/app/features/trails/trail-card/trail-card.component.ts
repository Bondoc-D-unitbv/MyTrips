import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'app-trail-card',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './trail-card.component.html',
  styleUrls: ['./trail-card.component.scss']
})
export class TrailCardComponent {
  @Input() trail!: Trail;
  @Output() viewDetails = new EventEmitter<string>();

  onViewDetails() {
    this.viewDetails.emit(this.trail.id);
  }
}
