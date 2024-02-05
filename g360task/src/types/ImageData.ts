export interface ApartmentGridData {
  id: string;
  name: string;
  floorPlans: Images[];
  stills: Images[];
  virtualTours: VirtualTour[];
  floorPlanArchiveDownloadUrl: string;
  stillsArchiveDownloadUrl: string;
}

export interface Images {
  original: string;
  thumbnail: string;
}

interface VirtualTour {
  id: string;
  url: string;
  thumbnail: string;
}
