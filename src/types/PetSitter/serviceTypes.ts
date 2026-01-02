import type { PetSitterFull } from "./PetSitterFull";


export interface GetAllPetSittersResponse {
    statusCode: number;
    message?: string;
    data: PetSitterFull[];
}




export type DeletePetSittersResponse = {
    statusCode: number,
    message?: string,
}