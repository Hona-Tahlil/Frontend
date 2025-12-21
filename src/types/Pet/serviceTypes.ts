

export interface GetAllPetsResponse {
    statusCode: number;
    message?: string;
    data: Pet[];
}

export type Pet = {
    id: number,
    name: string,
    kind: string,
    species: string,
    gender: string,
    pictureLink: string,
    birthDate: string,
    isAdult: boolean, 
}


export type DeletePetResponse = {
    statusCode: number,
    message?: string,
}