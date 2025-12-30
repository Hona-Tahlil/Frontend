import type { Pet } from "./pet";

export type GetPetByIdResponse = {
  statusCode: number;
  message: string;
  data: Pet;
};

export type UpdatePetInfoResponse = {
  statusCode: number;
  message?: string;
  data: null;
};
