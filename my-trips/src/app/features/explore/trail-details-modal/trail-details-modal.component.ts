  import { Component, Input } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { Trail } from '../../../models/trail.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

  @Component({
    selector: 'app-trail-details-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trail-details-modal.component.html',
    styleUrl: './trail-details-modal.component.scss'
  })
  export class TrailDetailsModalComponent {

    trail!: Trail;

  constructor() {}

  closeModal(): void {
    console.log('Modal closed');
  }
  }
