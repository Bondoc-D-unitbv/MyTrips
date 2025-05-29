import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { TrailService } from '../../../core/services/trail.service';
import { Trail } from '../../../models/trail.model';

@Component({
  selector: 'app-add-trail-form',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './add-trail-form.component.html',
  styleUrl: './add-trail-form.component.scss'
})
export class AddTrailFormComponent implements OnInit{
  form!: FormGroup;
  trailService = inject(TrailService);

  CreateFormGroup() {
    this.form = new FormGroup({
      title : new FormControl('', [Validators.required, Validators.minLength(3)]),
      location : new FormControl('', [Validators.required, Validators.minLength(3)]),
      shortDescription : new FormControl('', [Validators.required, Validators.minLength(10)]),
      longDescription : new FormControl('', [Validators.required, Validators.minLength(20)]),
      thumbnailUrl : new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      coordinates: new FormGroup({
        lat: new FormControl<number | null>(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
        lng: new FormControl<number | null>(null, [Validators.required, Validators.min(-180), Validators.max(180)])
      }),
      type: new FormControl<'hiking' | 'biking' | 'walking' | 'skiing' | 'climbing' | 'cycling' | 'kayaking' | 'horseback riding' | 'caving'>('hiking')
    });
  }

  ngOnInit(): void {
    this.CreateFormGroup();
  }

    submitForm(updateItemId: string = '-1'): boolean {
  if (this.form.invalid) {
     this.markAllControlsDirty(this.form); 
    return false;
  }

  const trail: Trail = {
    id: updateItemId === '-1' ? this.trailService.generateId() : updateItemId,
    title: this.form.value.title!,
    location: this.form.value.location!,
    shortDescription: this.form.value.shortDescription!,
    longDescription: this.form.value.longDescription!,
    thumbnailUrl: this.form.value.thumbnailUrl!,
    coordinates: {
      lat: this.form.value.coordinates.lat!,
      lng: this.form.value.coordinates.lng!
    },
    type: this.form.value.type!
  };

  if (updateItemId === '-1') {
    this.trailService.addTrail(trail);
  } else {
    this.trailService.updateTrail(trail);
  }

  this.form.reset();
  return true;
}

markAllControlsDirty(group: FormGroup): void {
  Object.values(group.controls).forEach(control => {
    if (control instanceof FormGroup) {
      this.markAllControlsDirty(control); 
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}


}
