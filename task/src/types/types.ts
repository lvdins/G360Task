export interface CardProps {
  title: string;
  imageUrl: string;
  onPreview: () => void;
  linkUrl?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fileCount?: number;
}

export interface ImageData {
  thumbnail: string;
  original: string;
}

export interface ApartmentData {
  stills: ImageData[];
  floor_plans: ImageData[];
  name: string;
}
