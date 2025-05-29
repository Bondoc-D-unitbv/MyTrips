export interface Trail {
    id: string;
    title: string;
    location: string;
    shortDescription: string;
    longDescription: string;
    thumbnailUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    type: 'hiking' | 'biking' | 'walking' | 'skiing' | 'climbing' | 'cycling' | 'kayaking' | 'horseback riding' | 'caving';
  }
  