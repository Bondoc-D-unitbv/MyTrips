import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrailCardComponent } from '../../trails/trail-card/trail-card.component';
import { TrailService } from '../../../core/services/trail.service';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TrailCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trails$!: Signal<Trail[]>;

  constructor(
    private trailService: TrailService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trails$ = this.trailService.trails;
  }

  openDetails(id: string) {
    this.router.navigate(['/explore', id]);
  }
}

