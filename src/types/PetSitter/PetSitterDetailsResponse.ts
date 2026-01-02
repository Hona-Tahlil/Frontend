import type { PetSitterFull } from "./PetSitterFull";

export type PetSitterDetailsResponse = {
  statusCode: number;
  message: string;
  data: PetSitterFull;
};
