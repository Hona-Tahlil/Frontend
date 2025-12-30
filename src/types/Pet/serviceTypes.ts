import type { Pet, PetBasicData } from "./pet";


export interface GetAllPetsResponse {
    statusCode: number;
    message?: string;
    data: PetBasicData[];
}




export type DeletePetResponse = {
    statusCode: number,
    message?: string,
}