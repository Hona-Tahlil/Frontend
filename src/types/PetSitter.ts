// src/types/PetSitter.ts

export type PetType = "dog" | "cat" | "bird" | "rodent";
export type ServiceType = "walking" | "training" | "care" | "medical";

export interface PetSitter {
  id: number;
  name: string;
  city: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  pets: PetType[];
  services: ServiceType[];
  experienceYears: number;
}

export interface FilterState {
  searchQuery: string;
  serviceType: string;
  pets: string[];
  city: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  priceRange: [number, number];
}
