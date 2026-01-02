export type Pet = {
  weight: number | null;
  name: string;
  kind: number;
  species: number;
  birthDate: string | null;
  isAdult?: boolean | null;
  gender: number;
  id: number;
  pictureLink?: string | undefined;
  aboutPet: string | null;
};

export type PetBasicData = {
  name: string;
  kind: string;
  species: string;
  isAdult?: boolean | null;
  gender: string;
  id: number;
  pictureLink?: string | undefined;
  birthDate: string | null;
};

export type PetDashboardCardProps = {
  name: string;
  kind: string;
  species: string;
  age: string | null;
  isAdult?: boolean | null;
  gender: string;
  id: number;
  pictureLink?: string | undefined;
}