export enum UserRole {
  Farmer = 'farmer',
  Worker = 'worker',
}

export enum Language {
  English = 'en',
  Marathi = 'mr',
}

export enum WorkType {
  CottonPlucking = 'cotton_plucking',
  Sowing = 'sowing',
  Spraying = 'spraying',
  Weeding = 'weeding',
  Harvesting = 'harvesting',
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface Job {
  id: string;
  workType: WorkType;
  dailyWage: number;
  locationName: string;
  location: LocationCoords;
  farmerName: string;
  farmerContact: string;
  isFilled?: boolean;
}

export enum ApplicationStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export interface Application {
  id: string;
  jobId: string;
  workerName: string;
  workerContact: string;
  status: ApplicationStatus;
}

export interface Notification {
  id: string;
  recipientContact: string;
  message: string;
  read: boolean;
}

export enum AppMode {
  Light = 'light',
  Dark = 'dark',
}

export enum FontSize {
  Small = 'sm',
  Base = 'base',
  Large = 'lg',
}

export interface Settings {
  language: Language;
  mode: AppMode;
  fontSize: FontSize;
}
