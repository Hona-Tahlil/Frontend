

export interface GetAllPetsResponse {
    statusCode: number;
    message?: string;
    data: Pet[];
}

export type Pet = {
    id: number,
    name: string,
    kind: number,
    species: number,
    gender: number,
    pictureLink: string,
}