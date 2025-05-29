import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailCardComponent } from '../../trails/trail-card/trail-card.component';
import { Trail } from '../../../models/trail.model';
import { TrailService } from '../../../core/services/trail.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TrailDetailsModalComponent } from '../trail-details-modal/trail-details-modal.component';
import { AddTrailFormComponent } from '../add-trail-form/add-trail-form.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-trails.page',
  standalone: true,
  imports: [ 
    CommonModule, 
    HeaderComponent, 
    NzTableModule, 
    NzDividerModule, 
    NzModalModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
  ],
  templateUrl: './trails.page.component.html',
  styleUrl: './trails.page.component.scss'
})
export class TrailsPageComponent {

  modalRef!: NzModalRef;
  searchText: string = '';
  trails: Trail[] = [];          // full data list
  filteredTrails: Trail[] = [];  // shown in table
  sortField: keyof Trail | '' = '';
  sortOrder: 'ascend' | 'descend' | null = null;
  loading = true;

  constructor(private trailService: TrailService, private modalService: NzModalService) {
    this.loadTrails();
  }

  loadTrails(): void {
    try {
      const trails = this.trailService.trails();
      this.trails = trails;
      this.filteredTrails = [...this.trails]; // Initialize filtered trails with all trails
    } finally {
      this.loading = false;
    }
  }

  onViewDetails(trailId: string): void {
  const trail = this.trailService.getTrailById(trailId);
  if (!trail) return;

  const modalRef = this.modalService.create({
    nzTitle: trail.title,
    nzContent: TrailDetailsModalComponent,
    nzFooter: null,
    nzWidth: 600
  });

  // Wait until modal is fully initialized, then set the trail
  modalRef.afterOpen.subscribe(() => {
    const instance = modalRef.getContentComponent();
    if (instance) {
      instance.trail = trail;
    }
  });
}

  addItem(): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'Add New Trail',
      nzContent: AddTrailFormComponent,
      nzOnOk: () => {
      const instance = this.modalRef.getContentComponent() as AddTrailFormComponent;  
      const isValid = instance.submitForm();
      console.log('Form submitted:', instance.form.value);
      console.log('Form valid:', isValid);
      if (isValid) {
        this.refreshTrails();
        return instance.form.value;  // This will be passed as the result of modal close
      }
      return false;  // Prevent modal from closing if invalid
    },
    nzOnCancel: () => {
      console.log('Cancel clicked');
    },
    nzWidth: '600px',
  });
}

  editItem(trailId: string): void {
    const trail = this.trailService.getTrailById(trailId);
    if (!trail) return;

    this.modalRef = this.modalService.create({
      nzTitle: `Edit Trail: ${trail.title}`,
      nzContent: AddTrailFormComponent,
      nzOnOk: () => {
        const instance = this.modalRef.getContentComponent() as AddTrailFormComponent;
        const isValid = instance.submitForm(trailId);
        if (isValid) {
          this.refreshTrails();
          return instance.form.value;  // This will be passed as the result of modal close
        }
        return false;  // Prevent modal from closing if invalid
      },
      nzOnCancel: () => {
        console.log('Cancel clicked');
      },
      nzWidth: '600px',
    });

    // Wait until modal is fully initialized, then set the trail
    this.modalRef.afterOpen.subscribe(() => {
      const instance = this.modalRef.getContentComponent();
      if (instance) {
        instance.form.patchValue(trail);
      }
    });
  }

  deleteItem(trailId: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this trail?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => {
        this.trailService.deleteTrail(trailId);
        this.refreshTrails();
      },
      nzOnCancel: () => console.log('Cancel clicked')
    });
  }

  refreshTrails(): void {
    this.loading = true;
    this.loadTrails();
  }

  search() {
  const term = this.searchText.toLowerCase();
  this.filteredTrails = this.trails.filter(trail =>
    trail.title.toLowerCase().includes(term) ||
    trail.location.toLowerCase().includes(term) ||
    trail.type.toLowerCase().includes(term)
  );
  this.applySort();
}

sort(field: keyof Trail, order: string | null): void {
  if (order === 'ascend' || order === 'descend') {
  this.sortField = field;
  this.sortOrder = order;
  this.applySort();
  }
  else {
    this.sortField = '';
    this.sortOrder = null;
  }
}

applySort() {
  if (!this.sortField || !this.sortOrder) return;

  // Type guard to ensure sortField is a valid key of Trail
  if (this.sortField) {
    this.filteredTrails.sort((a, b) => {
      const field = this.sortField as keyof Trail;
      const valA = a[field];
      const valB = b[field];

      return this.sortOrder === 'ascend'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }
}

}
