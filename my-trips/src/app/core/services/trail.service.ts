// trail.service.ts
import { Injectable, signal } from '@angular/core';
import { Trail } from '../../models/trail.model';

@Injectable({
  providedIn: 'root'
})
export class TrailService {
  private trailList = signal<Trail[]>([
    {
      id: '1',
      title: 'Transfăgărășan Trail',
      location: 'Făgăraș Mountains, Romania',
      shortDescription: 'Scenic biking route through winding mountain roads.',
      longDescription: 'One of the most beautiful roads in the world... (more details)',
      thumbnailUrl: 'https://source.unsplash.com/400x250/?mountain,road',
      coordinates: { lat: 45.5987, lng: 24.6165 },
      type: 'biking'
    },
    {
      id: '2',
      title: 'Retezat Peak Hike',
      location: 'Retezat National Park, Romania',
      shortDescription: 'A wild hike to one of the highest Carpathian peaks.',
      longDescription: 'The trail starts from Gura Zlata... (more details)',
      thumbnailUrl: 'https://source.unsplash.com/400x250/?mountain,hike',
      coordinates: { lat: 45.3406, lng: 22.8847 },
      type: 'hiking'
    }
  ]);

  trails = this.trailList.asReadonly();

  addTrail(trail: Trail) {
    this.trailList.update(trails => [...trails, trail]);
  }

  getTrailById(id: string): Trail | undefined {
    return this.trailList().find(t => t.id === id);
  }

  deleteTrail(id: string) {
    this.trailList.update(trails => trails.filter(t => t.id !== id));
  }

  updateTrail(updated: Trail) {
    this.trailList.update(trails =>
      trails.map(t => (t.id === updated.id ? updated : t))
    );
  }
}
